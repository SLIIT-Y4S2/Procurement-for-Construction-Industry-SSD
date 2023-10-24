import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { signJwt } from "../utils/jwt.utils";
import { createItem } from "../service/item.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const supplierId = new mongoose.Types.ObjectId().toString();

export const itemPayload = {
  supplier: supplierId,
  name: "Tokyo Cement 50kg",
  description: "Cement",
  price: 1000,
  active: true,
};

export const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  name: "Jane Doe",
  role: "procurementStaff",
  contactNumber: "0712345678",
};

describe("site", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("create item route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post("/api/items");

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and create the item", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/items")
          .set("Authorization", `Bearer ${jwt}`)
          .send(itemPayload);

        expect(statusCode).toBe(201);

        expect(body.name).toBe(itemPayload.name);
      });
    });
  });
  describe("get item list route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get("/api/items");
        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and get the item list", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/items")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        // expect(body[0].name).toBe(itemPayload.name);
      });
    });
  });
  describe("update item route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const oldItem = await createItem(itemPayload);
        const { statusCode } = await supertest(app).put(
          `/api/items/${oldItem.itemId}`
        );

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and update the item", async () => {
        const jwt = signJwt(userPayload);

        const oldItem = await createItem(itemPayload);

        const updatePayload = { ...itemPayload, name: "Tokyo Cement 100kg" };

        const { statusCode, body } = await supertest(app)
          .put(`/api/items/${oldItem.itemId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(updatePayload);

        expect(statusCode).toBe(200);

        expect(body.name).toBe("Tokyo Cement 100kg");
      });
    });
  });
});
