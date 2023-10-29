import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { signJwt } from "../utils/jwt.utils";

import { SiteInput } from "../models/site.model";
import { createSite } from "../service/site.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const sitePayload: SiteInput = {
  name: "Navaloka Hospitals Nuwara Eliya",
  address: "275 Mahinda Mawatha, Nuwara Eliya 22200",
  city: "Nuwara Eliya",
  mapLocation: "https://maps.app.goo.gl/K9hWCkfkToZwVDC48",
  contactNumber: "0522222222",
};

export const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  name: "Jane Doe",
  role: "procurementStaff",
  contactNumber: "0712345678",
};


/**
 * Main test suite
 */
describe("site", () => {
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
  describe("create site route", () => {
    describe("given the user is not logged in", () => {
      /* failure scenario */
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post("/api/sites");

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      /* success scenario */
      it("should return a 200 and create the site", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/sites")
          .set("Authorization", `Bearer ${jwt}`)
          .send(sitePayload);

        expect(statusCode).toBe(201);

        expect(body.name).toBe(sitePayload.name);
      });
    });
  });

  /**
   * Sub test suite 2 - GET operation (all)
   */
  describe("get sites list route", () => {
    describe("given the user is not logged in", () => {
      /* failure scenario */
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get("/api/sites");

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      /* success scenario */
      it("should return a 200 and the sites", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/sites")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: sitePayload.name,
            }),
          ])
        );
      });
    });
  });

  /**
   * Sub test suite 3 - GET operation (particular site)
   */
  describe("get site by id route", () => {
    describe("given the site does not exist", () => {
      /* failure scenario */
      it("should return a 404", async () => {
        const siteId = "site-123";
        const jwt = signJwt(userPayload);

        await supertest(app)
          .get(`/api/sites/${siteId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .expect(404);
      });
    });

    describe("given the site does exist", () => {
      /* success scenario */
      it("should return a 200 status and the site", async () => {
        const site = await createSite(sitePayload);
        const jwt = signJwt(userPayload);

        const { body, statusCode } = await supertest(app)
          .get(`/api/sites/${site.siteId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body.name).toBe(sitePayload.name);
      });
    });
  });

  /**
   * Sub test suite 4 - update site
   */
  describe("update site route", () => {
    describe("given the user is not logged in", () => {
      /* failure scenario */
      it("should return a 403", async () => {
        const site = await createSite(sitePayload);
        const { statusCode } = await supertest(app).put(
          `/api/sites/${site.siteId}`
        );
        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      /* success scenario */
      it("should return a 200 and update the site", async () => {
        const site = await createSite(sitePayload);
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .put(`/api/sites/${site.siteId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(sitePayload);

        expect(statusCode).toBe(200);

        expect(body.name).toBe(sitePayload.name);
      });
    });
  });

  describe("delete site route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const site = await createSite(sitePayload);

        const { statusCode } = await supertest(app).delete(
          `/api/sites/${site.siteId}`
        );

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      it("should return a 200 and delete the site", async () => {
        const site = await createSite(sitePayload);
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .delete(`/api/sites/${site.siteId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(sitePayload);

        expect(statusCode).toBe(200);

        // expect(body.name).toBe(sitePayload.name);
      });
    });
  });
});
