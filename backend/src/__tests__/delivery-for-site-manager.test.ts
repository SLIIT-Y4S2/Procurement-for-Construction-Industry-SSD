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
import { createDelivery } from "../service/deliver.service";

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
  status: "partially-shipped",
};

describe("deliveries for site manager", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  let user: any;
  let supplier: any;
  let jwt: string;
  let order: OrderDocument;
  let delivery: any;

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  beforeAll(async () => {
    user = await createUser(userPayload);
    supplier = await createUser(supplierPayload);
    jwt = signJwt({ ...userPayload, role: "siteManager" });
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
    delivery = await createDelivery({
      order: order._id,
      items: [
        {
          item: item._id,
          quantity: 5,
        },
      ],
      supplier: user._id,
      site: order.site,
      siteManager: order.siteManager,
    });
  });

  // getting the deliveries for the site manager
  describe("get deliveries for site manager route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get(
          "/api/site-manager/deliveries"
        );

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      it("should return a 200 and the deliveries", async () => {
        const { statusCode, body } = await supertest(app)
          .get("/api/site-manager/deliveries")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toHaveLength(1);
      });
    });
  });

  // site manager update the delivery status
  describe("update delivery status route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).patch(
          `/api/site-manager/deliveries/${delivery.goodReceiptId}/received`
        );

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      it("should return a 200 and the updated delivery", async () => {
        const { statusCode, body } = await supertest(app)
          .patch(
            `/api/site-manager/deliveries/${delivery.goodReceiptId}/received`
          )
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body.status).toBe("received");
      });
    });
  });
});
