import { request } from "../../../src/common.ts";
import { clearDb } from "../../../src/db/index.ts";
import { numberOfUsers, users } from "./setup.ts";

jest.setTimeout(10_000);

describe("Tic Tac Toe Public room", () => {
  allUserAccessTokenTest();
  allUserConnectSocketTest();

  describe("Room actions", () => {
    allUserJoinPublicRoomTest();
  });

  allUserDisconnectSocketTest();
});

function allUserJoinPublicRoomTest() {
  let roomCodes: string[] = [];

  describe("All users join public room", () => {
    (test.each(users.map((_, i) => i))(
      "should be join public room %i",
      (id, done) => {
        const user = users[id];

        let isGetPlayerData = false;
        let isGetRoomData = false;
        let isNeedJoinRoomAction = id % 2 !== 1;

        const makeDone = () => {
          if (isGetPlayerData && isGetRoomData && isNeedJoinRoomAction) {
            done();
          }
        };

        if (!isNeedJoinRoomAction) {
          let isPlayerJoined = false;
          let isGameStarted = false;

          const joinRoomDone = () => {
            if (isPlayerJoined && isGameStarted) {
              isNeedJoinRoomAction = true;
              makeDone();
            }
          };

          const opponent = users[id - 1];
          opponent.socket.on("game_started", (res: any) => {
            expect(res).toBeDefined();
            expect(res.success).toBeTruthy();
            expect(res.data).toBeDefined();
            expect(res.data.room).toBeDefined();
            expect(res.data.room.roomCode).toBeDefined();
            expect(res.data.room.roomCode).toHaveLength(4);
            expect(res.data.room.roomCode).toBe(user.roomCode);

            isGameStarted = true;
            joinRoomDone();
          });

          opponent.socket.on("player_joined", (res: any) => {
            expect(res).toBeDefined();
            expect(res.success).toBeTruthy();
            expect(res.data).toBeDefined();
            expect(res.data.room).toBeDefined();
            expect(res.data.room.roomCode).toBeDefined();
            expect(res.data.room.roomCode).toHaveLength(4);
            expect(res.data.room.roomCode).toBe(user.roomCode);

            isPlayerJoined = true;
            joinRoomDone();
          });
        }

        user.socket.on("player_data", (res: any) => {
          expect(res).toBeDefined();
          expect(res.success).toBeTruthy();
          expect(res.data.player).toBeDefined();

          isGetPlayerData = true;
          makeDone();
        });

        user.socket.emit("random_room", "tic_tac_toe", (res: any) => {
          expect(res).toBeDefined();
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          const room = res.data.room;
          expect(room).toBeDefined();
          expect(room.roomCode).toBeDefined();
          expect(room.roomCode).toHaveLength(4);
          user.roomCode = room.roomCode;
          roomCodes.push(room.roomCode);
          isGetRoomData = true;
          makeDone();
        });
      }
    ),
      10_000);
  });

  describe("Room check", () => {
    test("should be no of users is equal to no of roomCodes", () => {
      expect(roomCodes).toHaveLength(numberOfUsers);
    });

    test("Should be no of rooms is half no of users", () => {
      const noOfRooms = new Set(roomCodes).size;
      const shouldNoOfRooms = Math.ceil(numberOfUsers / 2);
      expect(noOfRooms).toBe(shouldNoOfRooms);
    });
  });

  describe("Should not allow to join room if already in room", () => {
    test.each(users.map((_, i) => i))(
      "should not allow to join room if already in room %i",
      (id, done) => {
        const user = users[id];
        user.socket.emit("random_room", "tic_tac_toe", (res: any) => {
          expect(res).toBeDefined();
          expect(res.success).toBeFalsy();
          expect(res.error).toBeDefined();
          expect(res.error).toBe("Player Already In Room");
          done();
        });
      }
    );
  });

  describe("Should make move", () => {
    test.each(users.map((_, i) => i))(
      "Should make move user %i",
      (id, done) => {
        const user = users[id];

        user.socket.emit(
          "make_move",
          "tic_tac_toe",
          {
            roomCode: user.roomCode,
            cell: id,
          },
          (res: any) => {
            expect(res).toBeDefined();
            expect(res.success).toBeDefined();
            expect(res.data).toBeDefined();
            const room = res.data.room;
            expect(room).toBeDefined();
            expect(room.board).toBeDefined();

            done();
          }
        );
      }
    );
  });

  describe("Should be leave room", () => {
    test.each(users.map((_, i) => i))("should be leave room %i", (id, done) => {
      const user = users[id];
      user.socket.emit("leave_room", "tic_tac_toe", (res: any) => {
        expect(res).toBeDefined();
        expect(res.success).toBeTruthy();
        expect(res.data).toBeUndefined();
        done();
      });
    });
  });
}

function allUserAccessTokenTest() {
  describe("All users get access token", () => {
    test.each(users.map((_, i) => i))(
      "should be get access token %i",
      (id, done) => {
        const user = users[id];
        request.post("/auth/guest").expect(201, (err, res) => {
          expect(err).toBeNull();
          expect(res.body).toBeDefined();

          const token = res.body.data.accessToken;
          expect(token).toBeDefined();
          user.accessToken = token;

          done();
        });
      }
    );
  });
}

function allUserConnectSocketTest() {
  describe("All users connect to socket", () => {
    test.each(users.map((_, i) => i))(
      "should be connect user %i",
      (id, done) => {
        const user = users[id];
        user.connectSocket();
        user.socket.once("connect", () => {
          expect(user.socket.connected).toBeTruthy();
          done();
        });
        user.socket.once("connect_error", () => {
          done();
        });
      }
    );
  });
}

function allUserDisconnectSocketTest() {
  describe("All users disconnect from socket", () => {
    test.each(users.map((_, i) => i))(
      "should be disconnect user %i",
      (id, done) => {
        const user = users[id];
        user.socket.once("disconnect", () => {
          expect(user.socket.connected).toBeFalsy();
          done();
        });
        user.disconnectSocket();
      }
    );
  });
}

afterAll(() => {
  clearDb();
});
