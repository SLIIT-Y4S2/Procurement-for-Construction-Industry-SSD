import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { signJwt } from "../utils/jwt.utils";
import { createUser } from "../service/user.service";
import { createItem } from "../service/item.service";

//TODO: import { createOrder } from "../service/order.service";

// import { SiteInput } from "../models/site.model";
// import { createSite } from "../service/site.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const orderPayload = {};

export const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  name: "Jane Doe",
  role: "procurementStaff",
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

        const item = await createItem({
          name: "item2",
          description: "item description",
          price: 100,
          supplier: supplier._id,
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
});
