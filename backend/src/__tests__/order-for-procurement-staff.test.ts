import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { signJwt } from "../utils/jwt.utils";
import { createUser } from "../service/user.service";
import { createItem } from "../service/item.service";
import { createSite } from "../service/site.service";

import { createOrder } from "../service/order.service";
import { UserDocument, UserInput } from "../models/user.model";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload: UserInput = {
  email: "jane.doe@example.com",
  name: "Jane Doe",
  role: "procurementStaff",
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
const orderPayload = {
  siteManager: userId,
  site: new mongoose.Types.ObjectId().toString(),
  comments: "comments",
  dateToBeDelivered: new Date("2021-10-10 10:00:00").toString(),
  //orders needs to be placed to be displayed for the supplier
  status: "approved",
};
describe("order", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // testing procurement staff getting their approved orders
  describe("get orders for procurement staff", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get(
          "/api/procurement-staff/orders"
        );

        expect(statusCode).toBe(403);
      });
    });
    describe("given the users not logged in as a procurement staff", () => {
      it("should return a 403", async () => {
        const jwt = signJwt({ ...userPayload, role: "supplier" });

        const { statusCode } = await supertest(app)
          .get("/api/procurement-staff/orders")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in as a procurement staff", () => {
      describe("given the user has no orders", () => {
        it("should return a 200 with an empty array", async () => {
          const jwt = signJwt({ ...userPayload, role: "procurementStaff" });

          const { statusCode, body } = await supertest(app)
            .get("/api/procurement-staff/orders")
            .set("Authorization", `Bearer ${jwt}`);

          expect(statusCode).toBe(200);
          expect(body).toEqual([]);
        });
      });
      describe("given the user has orders", () => {
        let user: any;
        let supplier: any;
        let jwt: string;
        let order: any;

        beforeEach(async () => {
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
            items: [{ item: item._id, quantity: 2 }],
          });
        });

        it("should return a 200 with an array of orders", async () => {
          const { statusCode, body } = await supertest(app)
            .get("/api/procurement-staff/orders")
            .set("Authorization", `Bearer ${jwt}`);

          expect(statusCode).toBe(200);
          expect(body[0]._id).toEqual(order._id.toString());
        });
      });
    });
  });
});
