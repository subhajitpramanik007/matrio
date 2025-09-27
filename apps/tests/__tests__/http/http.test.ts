import { HTTP_SERVER } from "../../src/constant.ts";
import { clearDb, getEmailVerificationToken } from "../../src/db/index.ts";
import { user } from "../../src/demo-data.ts";

import supertest from "supertest";

let request: supertest.Agent;
let accessToken: string;

beforeAll(() => {
  request = supertest(HTTP_SERVER + "/api/v1");
});

afterAll(() => {
  clearDb();
});

describe("HTTP Server", () => {
  it("should return 200", () => {
    return request.get("/health").expect(200);
  });
});

describe("Auth Controller", () => {
  describe("Guest", () => {
    test("should return 201", async () => {
      await request
        .post("/auth/guest")
        .expect(201)
        .then((res) => (accessToken = res.body.data.accessToken));
    });

    test("should block create guest", async () => {
      await request.post("/auth/guest").expect(429);
    });
  });

  describe("Signup", () => {
    test("should return 201", async () => {
      await request
        .post("/auth/signup")
        .send({
          email: user.email,
          password: user.password,
          username: user.username,
          termsAndConditions: user.termsAndConditions,
        })
        .expect(201)
        .then((res) => {
          accessToken = res.body.data.accessToken;
        });
    });

    test("should be not allowed with same email", async () => {
      await request
        .post("/auth/signup")
        .send({
          email: user.email,
          password: user.password,
          username: user.username,
          termsAndConditions: user.termsAndConditions,
        })
        .expect(400);
    });

    test("should be not allowed with same username", async () => {
      await request
        .post("/auth/signup")
        .send({
          email: "test1@example.com",
          password: user.password,
          username: user.username,
          termsAndConditions: user.termsAndConditions,
        })
        .expect(400);
    });
  });

  describe("Resend Verification Email", () => {
    test("should return 200", async () => {
      await request
        .post("/auth/resend-verification-email")
        .send({ email: user.email })
        .expect(200);
    });

    test("should be not allowed more than 3 times", async () => {
      for (let i = 0; i < 2; i++) {
        await request
          .post("/auth/resend-verification-email")
          .send({ email: user.email })
          .expect(200);
      }

      await request
        .post("/auth/resend-verification-email")
        .send({ email: user.email })
        .expect(429);
    });
  });

  describe("Email Verify", () => {
    test("should be not allowed", async () => {
      await request
        .post("/auth/email-verify")
        .send({ email: user.email, token: "invalid" })
        .expect(400);
    });

    test("should return 200", async () => {
      const token = await getEmailVerificationToken(user.email);
      await request
        .post("/auth/email-verify")
        .send({ email: user.email, token })
        .expect(200)
        .then((res) => {
          accessToken = res.body.data.accessToken;
        });
    });
  });

  describe("Check Session", () => {
    test("should return 200", async () => {
      const res = await request
        .get("/auth/session")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);
      const data = res.body.data;
      expect(data.user).toBeDefined();
    });
  });

  describe("Logout", () => {
    test("should return 200", async () => {
      await request
        .post("/auth/signout")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);
      accessToken = "";
    });

    test("should return 401 when access token is invalid", async () => {
      await request
        .get("/auth/session")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(401);
    });
  });

  describe("Signin", () => {
    test("should be not allowed with invalid credentials", async () => {
      await request
        .post("/auth/signin")
        .send({ emailOrUsername: user.email, password: "invalid" })
        .expect(400);
    });

    test("should be not allowed with missing credentials", async () => {
      await request
        .post("/auth/signin")
        .send({ emailOrUsername: "test1@example.com", password: "password" })
        .expect(400);
    });

    test("should return 200 when signin via email", async () => {
      await request
        .post("/auth/signin")
        .send({ emailOrUsername: user.email, password: user.password })
        .expect(200)
        .then((res) => {
          accessToken = res.body.data.accessToken;
        });
    });

    test("should return 200 when signin via username", async () => {
      await request
        .post("/auth/signin")
        .send({ emailOrUsername: user.username, password: user.password })
        .expect(200)
        .then((res) => {
          accessToken = res.body.data.accessToken;
        });
    });

    test("should be get session", async () => {
      await request
        .get("/auth/session")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);
    });

    test("should be logout", async () => {
      await request
        .post("/auth/signout")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);
      accessToken = "";
    });

    test("should return 401 when access token is invalid", async () => {
      await request
        .get("/auth/session")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(401);
    });
  });
});
