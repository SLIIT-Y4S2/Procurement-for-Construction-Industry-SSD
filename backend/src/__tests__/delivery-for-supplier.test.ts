import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { signJwt } from "../utils/jwt.utils";
import { createUser } from "../service/user.service";
import { createItem } from "../service/item.service";

import { createOrder } from "../service/order.service";
import { OrderDocument } from "../models/order.model";
import { UserInput } from "../models/user.model";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload: UserInput = {
  email: "jane.doe@example.com",
  name: "Jane Doe",
  role: "supplier",
  contactNumber: "0712345678",
  password: "Password456!",
};
const supplierPayload: UserInput = {
  email: "supplier23@example.com",
  name: "Supplier",
  role: "supplier",
  contactNumber: "0712345678",
  password: "Password456!",
};

export const orderPayload = {
  supplier: new mongoose.Types.ObjectId().toString(),
  items: [
    {
      item: new mongoose.Types.ObjectId().toString(),
      quantity: 2,
    },
    {
      item: new mongoose.Types.ObjectId().toString(),
      quantity: 5,
    },
  ],
  siteManager: userId,
  site: new mongoose.Types.ObjectId().toString(),
  comments: "comments",
  dateToBeDelivered: new Date("2021-10-10 10:00:00").toString(),
  //orders needs to be placed to be displayed for the supplier
  status: "placed",
};

describe("deliveries for supplier", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  let user: any;
  let supplier: any;
  let jwt: string;
  let order: OrderDocument;

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  beforeAll(async () => {
    user = await createUser(userPayload);
    supplier = await createUser(supplierPayload);
    jwt = signJwt({ ...userPayload, role: "procurementStaff" });
    const item = await createItem({
      name: "item1",
      description: "item description",
      price: 100,
      supplier: user._id,
    });
    order = await createOrder({
      ...orderPayload,
      supplier: user._id,
      items: [{ item: item._id, quantity: 5 }],
    });
  });

  // testing supplier making partial and full deliveries
  describe("make delivery for supplier", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post(
          "/api/supplier/orders/:purchaseOrderId/deliver"
        );

        expect(statusCode).toBe(403);
      });
    });
    describe("given the users not logged in as a supplier", () => {
      it("should return a 403", async () => {
        const jwt = signJwt({ ...userPayload, role: "procurementStaff" });

        const { statusCode } = await supertest(app)
          .post("/api/supplier/orders/:purchaseOrderId/deliver")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      // negative test case
      // testing supplier making delivery quantity more than the order quantity
      describe("given the delivery quantity is more than the order quantity", () => {
        it("should return a 409 and not make the delivery", async () => {
          const jwt = signJwt(user);

          const { statusCode, body } = await supertest(app)
            .post(`/api/supplier/orders/${order.orderId}/deliver`)
            .set("Authorization", `Bearer ${jwt}`)
            .send({
              items: [
                {
                  item: order.items[0].item._id.toString(),
                  quantity: 10,
                },
              ],
            });

          expect(statusCode).toBe(409);
        });
      });

      // testing supplier making partial delivery
      describe("given the delivery quantity is less than the order quantity", () => {
        it("should return a 201 and make the delivery", async () => {
          const jwt = signJwt(user);

          const { statusCode, body } = await supertest(app)
            .post(`/api/supplier/orders/${order.orderId}/deliver`)
            .set("Authorization", `Bearer ${jwt}`)
            .send({
              items: [
                {
                  item: order.items[0].item._id.toString(),
                  quantity: 1,
                },
              ],
            });

          expect(statusCode).toBe(200);
        });
      });
      // testing supplier making full delivery
      describe("given the delivery quantity is equal to the order quantity", () => {
        it("should return a 201 and make the delivery", async () => {
          const jwt = signJwt(user);

          const { statusCode, body } = await supertest(app)
            .post(`/api/supplier/orders/${order.orderId}/deliver`)
            .set("Authorization", `Bearer ${jwt}`)
            .send({
              items: [
                {
                  item: order.items[0].item._id.toString(),
                  quantity: 1,
                },
              ],
            });

          expect(statusCode).toBe(200);
        });
      });
    });
  });

  // testing supplier getting all their goods receipts they they delivered - pending and confirmed
  describe("get goods receipts for supplier", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get(
          "/api/supplier/orders/goodsReceipts"
        );

        expect(statusCode).toBe(403);
      });
    });
    describe("given the users not logged in as a supplier", () => {
      it("should return a 403", async () => {
        const jwt = signJwt({ ...userPayload, role: "procurementStaff" });

        const { statusCode } = await supertest(app)
          .get("/api/supplier/orders/goodsReceipts")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and get the orders", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/supplier/orders/goodsReceipts")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toBeDefined();
      });
    });
  });
});
