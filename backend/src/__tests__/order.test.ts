import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { signJwt } from "../utils/jwt.utils";

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

describe("site", () => {
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
});
