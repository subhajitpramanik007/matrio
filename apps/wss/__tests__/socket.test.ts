import { getAccessToken, getNewSocket } from "./utils";
// defaults timeout of test is 1000ms
jest.setTimeout(3000);

let accessToken = "";
let socket: any;

beforeAll(async () => {
  accessToken = await getAccessToken();
  socket = getNewSocket(accessToken);
  socket.connect();
});

afterAll(() => {
  socket.disconnect();
});

describe("Socket", () => {
  test("Should connect to socket", (done) => {
    socket.on("connect", () => {
      expect(socket.connected).toBe(true);
      done();
    });
  });

  test("Should emit event", (done) => {
    socket.on("pong", (data: any) => {
      expect(data).toBe("pong");
      done();
    });
    socket.emit("ping", "ping");
  });

  describe("Games", () => {
    test("Should create room", (done) => {
      socket.emit(
        "create_room",
        { data: { id: "123" }, gameNameSpace: "tic_tac_toe" },
        (res: any) => {}
      );
      done();
    });
  });

  test("Should disconnect", (done) => {
    socket.disconnect();

    expect(socket.connected).toBe(false);
    done();
  });
});
