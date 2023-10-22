import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { signJwt } from "../utils/jwt.utils";
import { createUser } from "../service/user.service";
import { createItem } from "../service/item.service";
import { createSite } from "../service/site.service";

import { createOrder } from "../service/order.service";

// import { SiteInput } from "../models/site.model";
// import { createSite } from "../service/site.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

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
};

export const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  name: "Jane Doe",
  role: "siteManager",
  contactNumber: "0712345678",
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

  describe("get all suppliers", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get("/api/suppliers");

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and get all suppliers", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/suppliers")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual([]);
      });
    });
  });

  describe("get supplier item list", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const supplier = await createUser({
          role: "supplier",
          email: "supplier1@example.com",
          password: "Password456!",
          contactNumber: "0711345678",
          name: "supplier1",
        });

        const { statusCode } = await supertest(app).get(
          `/api/suppliers/${supplier._id}/items`
        );

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and get all supplier items", async () => {
        const supplier = await createUser({
          role: "supplier",
          email: "supplier2@example.com",
          password: "Password456!",
          contactNumber: "0712345678",
          name: "supplier2",
        });

        const item = await createItem({
          name: "item2",
          description: "item description",
          price: 100,
          supplier: supplier._id,
        });
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .get(`/api/suppliers/${supplier._id}/items`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect(body[0].name).toEqual(item.name);
      });
    });
  });

  describe("create order", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post("/api/orders");

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and create order", async () => {
        const jwt = signJwt(userPayload);

        const supplier = await createUser({
          role: "supplier",
          email: "supplier3@example.com",
          password: "Password456!",
          contactNumber: "0712345678",
          name: "supplier3",
        });
        const item1 = await createItem({
          name: "item3",
          description: "item description",
          price: 100,
          supplier: supplier._id,
        });
        const item2 = await createItem({
          name: "item4",
          description: "item description",
          price: 100,
          supplier: supplier._id,
        });
        const site = await createSite({
          name: "site1",
          address: "address",
          contactNumber: "0712345678",
          city: "city",
          mapLocation: "mapLocation",
        });
        const { statusCode, body } = await supertest(app)
          .post("/api/orders")

          .send({
            supplier: supplier._id,
            items: [
              { item: item1._id, quantity: 2 },
              { item: item2._id, quantity: 5 },
            ],
            siteManager: userId,
            site: site._id,
            comments: "comments",
            dateToBeDelivered: new Date("2021-10-10 10:00:00") as Date,
          })
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(201);

        expect(body.status).toEqual("pending");
      });
    });
  });

  describe("get order list", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get("/api/orders");

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and get all orders", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/orders")

          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect(body[0].status).toEqual("pending"); //just after creating the order
        expect(body[0].items[0].item.name).toEqual("item3");
      });
    });
  });

  describe("get pending approval order list for company manager", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get(
          "/api/orders/pending-approval/company-manager"
        );

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and get all pending approval orders for company manager", async () => {
        const jwt = signJwt({ ...userPayload, role: "companyManager" });

        const { statusCode, body } = await supertest(app)
          .get("/api/orders/pending-approval/company-manager")

          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect(body[0].status).toEqual("pending");
      });
    });
  });

  describe("approving order by company manager", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const item = await createItem({
          name: "item1",
          description: "item description",
          price: 100,
          supplier: new mongoose.Types.ObjectId().toString(),
        });
        const order = await createOrder({
          ...orderPayload,
          items: [{ item: item._id, quantity: 2 }],
        });
        const { statusCode } = await supertest(app).patch(
          `/api/orders/pending-approval/company-manager/${order.orderId}/approve`
        );

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and approve order", async () => {
        const jwt = signJwt({ ...userPayload, role: "companyManager" });
        const item = await createItem({
          name: "item1",
          description: "item description",
          price: 100,
          supplier: new mongoose.Types.ObjectId().toString(),
        });
        const order = await createOrder({
          ...orderPayload,
          items: [{ item: item._id, quantity: 2 }],
        });

        const { statusCode, body } = await supertest(app)
          .patch(
            `/api/orders/pending-approval/company-manager/${order.orderId}/approve`
          )
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect(body.status).toEqual("approved");
      });
    });
  });

  describe("declining order by company manager", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const item = await createItem({
          name: "item7",
          description: "item description",
          price: 100,
          supplier: new mongoose.Types.ObjectId().toString(),
        });
        const order = await createOrder({
          ...orderPayload,
          items: [{ item: item._id, quantity: 2 }],
        });
        const { statusCode } = await supertest(app).patch(
          `/api/orders/pending-approval/company-manager/${order.orderId}/decline`
        );

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and decline order", async () => {
        const jwt = signJwt({ ...userPayload, role: "companyManager" });
        const item = await createItem({
          name: "item1",
          description: "item description",
          price: 100,
          supplier: new mongoose.Types.ObjectId().toString(),
        });
        const order = await createOrder({
          ...orderPayload,
          items: [{ item: item._id, quantity: 2 }],
        });

        const { statusCode, body } = await supertest(app)
          .patch(
            `/api/orders/pending-approval/company-manager/${order.orderId}/decline`
          )
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect(body.status).toEqual("declined");
      });
    });
  });
});
