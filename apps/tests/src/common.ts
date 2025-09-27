import supertest from "supertest";
import { HTTP_SERVER } from "./constant.ts";
import { clearDb } from "./db/index.ts";

let request: supertest.Agent = supertest(HTTP_SERVER + "/api/v1");

afterAll(() => {
  clearDb();
});

export { request };
