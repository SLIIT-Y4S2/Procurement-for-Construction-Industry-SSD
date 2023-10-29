import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { signJwt } from "../utils/jwt.utils";

import { createUser } from "../service/user-management.service";
import { CreateUserInput } from "../schema/user-management.schema";

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  userId: "UID_123",
  email: "jane.doe@example.com",
  name: "Jane Doe",
  role: "companyManager",
  contactNumber: "0712345678",
};

const userInput: CreateUserInput["body"] = {
  email: "test@example.com",
  name: "Jane Doe",
  password: "Password123",
  passwordConfirmation: "Password123",
  role: "siteManager",
  contactNumber: "0712345678",
};

/**
 * Main test suite
 */
describe("user-management", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  /**
   * Sub test suite 1 - POST operation
   */
  describe("create user route", () => {
    describe("given the user is not logged in", () => {
      /* failure scenario */
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post(
          "/api/user-management"
        );

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      /* success scenario */
      it("should return a 201 and create the user", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/user-management")
          .set("Authorization", `Bearer ${jwt}`)
          .send(userInput);

        expect(statusCode).toBe(201);

        expect(body.name).toBe(userInput.name);
      });
    });
  });

  /**
   * Sub test suite 2 - GET operation (all)
   */
  describe("get user list route", () => {
    describe("given the user is not logged in", () => {
      /* failure scenario */
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get("/api/user-management");

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      /* success scenario */
      it("should return a 200 and the users", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/user-management")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body.length).toBe(1);
      });
    });
  });

  /**
   * Sub test suite 4 - update user
   */
  describe("update user route", () => {
    describe("given the user is not logged in", () => {
      /* failure scenario */
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).put(
          `/api/user-management/${userPayload.userId}`
        );

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      /* success scenario */
      it("should return a 200 and update the user", async () => {
        const jwt = signJwt(userPayload);

        const created = await createUser({
          ...userInput,
          email: "text1@example.com", // to avoid duplicate email error
        });
        const { statusCode, body } = await supertest(app)
          .put(`/api/user-management/${created.userId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send({
            name: "John Doe",
            email: "jane.doe@example.com",
            role: "companyManager",
          });

        expect(statusCode).toBe(200);
        expect(body.name).toBe("John Doe");
      });
    });
  });
});
