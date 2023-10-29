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

describe("order for site manager", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // for mobile application to display the list of suppliers
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

  // for mobile application to display the list of items for a supplier
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

  //for mobile application to create an order
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

  // view all their orders
  describe("get all orders for site manager", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get(
          "/api/orders/site-manager"
        );

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and get all orders", async () => {
        const jwt = signJwt(userPayload);

        const supplier = await createUser({
          role: "supplier",
          email: "supplier123@gmail.com",
          contactNumber: "0712345678",
          name: "supplier123",
          password: "Password456!",
        });
        const item1 = await createItem({
          name: "item123",
          description: "item description",
          price: 100,
          supplier: supplier._id,
        });
        const item2 = await createItem({
          name: "item456",
          description: "item description",
          price: 100,
          supplier: supplier._id,
        });
        const site = await createSite({
          name: "site123",
          address: "address",
          contactNumber: "0712345678",
          city: "city",
          mapLocation: "mapLocation",
        });
        await createOrder({
          supplier: supplier._id,
          items: [
            { item: item1._id, quantity: 2 },
            { item: item2._id, quantity: 5 },
          ],
          siteManager: userId,
          site: site._id,
          comments: "comments",
          dateToBeDelivered: new Date("2021-10-10 10:00:00").toDateString(),
        });

        const { statusCode, body } = await supertest(app)
          .get("/api/orders/site-manager")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toHaveLength(2);
      });
    });
  });
});
