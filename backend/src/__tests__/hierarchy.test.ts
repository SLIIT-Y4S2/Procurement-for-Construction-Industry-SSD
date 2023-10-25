import { MongoMemoryServer } from "mongodb-memory-server";
import { HierarchyInput } from "../models/hierarchy.model";
import createServer from "../utils/server";
import mongoose from "mongoose";
import supertest from "supertest";

const app = createServer();

/**
 * Main test suite
 */
describe("hierarchy test suite", () => {
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
  describe("create new hierarchy", () => {
    /* Test case 1 - success scenario */
    test("success scenario", async () => {
      const hierarchyPayload: HierarchyInput = {
        lowerBoundPrice: 5000,
        upperBoundPrice: 12000,
        managerInCharge: "Supply Chain Manager 1",
      };

      const { statusCode, body } = await supertest(app)
        .post("/api/hierarchies")
        .send(hierarchyPayload);

      /* Assertions */
      expect(statusCode).toBe(201);
      expect(body).toBeDefined();
    });

    /* Test case 2 - failure scenario */
    test("failure scenario", async () => {
      const { statusCode, body } = await supertest(app).post(
        "/api/hierarchies"
      );

      /* Assertions */
      expect(statusCode).toBe(409);
      expect(body).toEqual({});
    });
  });

  /**
   * Sub test suite 2 - GET operation (all)
   */
  describe("get all hierarchies", () => {
    /* Test case 1 - success scenario */
    test("success scenario", async () => {
      const { statusCode, body } = await supertest(app).get("/api/hierarchies");

      /* Assertions */
      expect(statusCode).toBe(200);
      expect(body).toBeInstanceOf(Array);
    });
  });

  /**
   * Sub test suite 3 - GET operation (particular)
   */
  describe("get a particular hierarchy", () => {
    /* Test case 1 - success scenario */
    test("success scenario", async () => {
      const hierarchyPayload: HierarchyInput = {
        lowerBoundPrice: 200,
        upperBoundPrice: 400,
        managerInCharge: "Supply Chain Manager 2",
      };

      const response1 = await supertest(app)
        .post("/api/hierarchies")
        .send(hierarchyPayload);

      const response2 = await supertest(app).get(
        `/api/hierarchies/${response1.body.hierarchyId}`
      );

      /* Assertions */
      expect(response2.statusCode).toBe(200);
      expect(response2.body.hierarchyId).toEqual(response1.body.hierarchyId);
    });

    /* Test case 2 - failure scenario */
    test("failure scenario", async () => {
      const wrongId = "abcjhIU";

      const response = await supertest(app).get(`/api/hierarchies/${wrongId}`);

      /* Assertions */
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({});
    });
  });

  /**
   * Sub test suite 4 - PUT operation
   */
  describe("update a particular hierarchy", () => {
    /* Test case 1 - success scenario */
    test("success scenario", async () => {
      const hierarchyPayload: HierarchyInput = {
        lowerBoundPrice: 2000,
        upperBoundPrice: 11000,
        managerInCharge: "Supply Chain Manager",
      };

      const hierarchyPayload2: HierarchyInput = {
        lowerBoundPrice: 10000,
        upperBoundPrice: 20000,
        managerInCharge: "Procurement Manager",
      };

      const response1 = await supertest(app)
        .post("/api/hierarchies")
        .send(hierarchyPayload);

      const response2 = await supertest(app)
        .put(`/api/hierarchies/${response1.body.hierarchyId}`)
        .send(hierarchyPayload2);

      /* Assertions */
      expect(response2.statusCode).toBe(200);
      expect(response2.body.hierarchyId).toEqual(response1.body.hierarchyId);
    });
  });
});
