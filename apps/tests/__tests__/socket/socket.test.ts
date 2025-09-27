import { HTTP_SERVER } from "../../src/constant.ts";
import { clearDb } from "../../src/db/index.ts";
import supertest from "supertest";
import { SocketResponse } from "../../../wss/src/common/response.ts";
import { User } from "../../src/user.ts";

let request: supertest.Agent;

let users: User[] = [];
users.push(new User());
users.push(new User());

beforeAll(async () => {
  request = supertest(HTTP_SERVER + "/api/v1");
});

describe("Rest API", () => {
  describe("Guest", () => {
    users.forEach((user) => {
      test(`Should return 201 (client${user._id.slice(0, 5)})`, async () => {
        const res = await request.post("/auth/guest").expect(201);
        user.setAccessToken(res.body.data.accessToken);
        expect(user.accessToken).toBeDefined();
      });
    });
  });
});

describe("Socket", () => {
  describe("Socket Connection", () => {
    describe("Connect", () => {
      users.forEach((user) => {
        test(`Should connect client${user._id.slice(0, 5)}`, (done) => {
          user.connectSocket();

          user.socket?.on("connect", () => {
            expect(user.socket?.connected).toBe(true);
            done();
          });

          user.socket?.on("connect_error", (err) => done(err));
        });
      });
    });

    describe("Test", () => {
      users.forEach((user) => {
        test(`Should ping emit pong client${user._id.slice(0, 5)}`, (done) => {
          user.socket?.emit("ping", "test");
          user.socket?.on("pong", (data: any) => {
            expect(data).toBe("test");
            done();
          });
        });
      });
    });

    describe("Disconnect", () => {
      users.forEach((user) => {
        test(`Should disconnect client${user._id.slice(0, 5)}`, (done) => {
          user.socket?.on("disconnect", () => {
            expect(user.socket?.connected).toBe(false);
            done();
          });
          user.socket?.disconnect();
        });
      });
    });
  });
});

afterAll(async () => {
  await clearDb(); // ✅ await cleanup if async
});
