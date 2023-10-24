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

// import { SiteInput } from "../models/site.model";
// import { createSite } from "../service/site.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload: UserInput = {
  email: "jane.doe@example.com",
  name: "Jane Doe",
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
  status: "placed",
};

describe("order-for-supplier", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // testing supplier getting their pending orders
  describe("get orders for supplier", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get("/api/supplier/orders");

        expect(statusCode).toBe(403);
      });
    });
    describe("given the users not logged in as a supplier", () => {
      it("should return a 403", async () => {
        const jwt = signJwt({ ...userPayload, role: "procurementStaff" });

        const { statusCode } = await supertest(app)
          .get("/api/supplier/orders")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and get the orders", async () => {
        const user = await createUser(userPayload);
        const jwt = signJwt(user);
        const item = await createItem({
          name: "item1",
          description: "item description",
          price: 100,
          supplier: user._id,
        });
        await createOrder({
          ...orderPayload,
          supplier: user._id,
          items: [{ item: item._id, quantity: 2 }],
        });

        const { statusCode, body } = await supertest(app)
          .get("/api/supplier/orders")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body[0].supplier.name).toEqual(user.name);
      });
    });
  });
  // testing supplier getting their order history
  describe("get order history for supplier", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get(
          "/api/supplier/orders/history"
        );

        expect(statusCode).toBe(403);
      });
    });
    describe("given the users not logged in as a supplier", () => {
      it("should return a 403", async () => {
        const jwt = signJwt({ ...userPayload, role: "procurementStaff" });

        const { statusCode } = await supertest(app)
          .get("/api/supplier/orders/history")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and get the orders", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/supplier/orders/history")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toBeDefined();
      });
    });
  });
  // testing supplier declining an order
  describe("decline order for supplier", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).put(
          "/api/supplier/orders/decline"
        );

        expect(statusCode).toBe(403);
      });
    });
    describe("given the users not logged in as a supplier", () => {
      it("should return a 403", async () => {
        const jwt = signJwt({ ...userPayload, role: "procurementStaff" });

        const { statusCode } = await supertest(app)
          .put("/api/supplier/orders/decline")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(403);
      });
    });
    // describe("given the user is logged in", () => {
    //   it("should return a 200 and decline the order", async () => {
    //     const jwt = signJwt(userPayload);

    //     const { statusCode } = await supertest(app)
    //       .put("/api/supplier/orders/decline")
    //       .set("Authorization", `Bearer ${jwt}`);

    //     expect(statusCode).toBe(200);
    //   });
    // });
  });
});
