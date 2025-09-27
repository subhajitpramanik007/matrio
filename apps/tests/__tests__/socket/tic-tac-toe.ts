// import { HTTP_SERVER } from "../../src/constant.ts";
// import { clearDb } from "../../src/db/index.ts";
// import { User } from "../../src/user.ts";

import supertest from "supertest";
import { HTTP_SERVER } from "../../src/constant.ts";

let request = supertest(HTTP_SERVER + "/api/v1");

// import supertest from "supertest";
// let user1: User;
// let user2: User;
// let user3: User;
// let user4: User;
// let user5: User;

// let request: supertest.Agent;

// beforeAll(async () => {
//   request = supertest(HTTP_SERVER + "/api/v1");
// });

// describe("Tic Tac Toe private room", () => {
//   user1 = new User();
//   user2 = new User();
//   user3 = new User();

//   let roomCode: string = "";

//   describe("Get access token", () => {
//     test(`Should get access token user1`, (done) => {
//       request.post("/auth/guest").expect(201, (err, res) => {
//         expect(res.body.data.accessToken).toBeDefined();
//         user1.setAccessToken(res.body.data.accessToken);
//         done();
//       });
//     });

//     test(`Should get access token user2`, (done) => {
//       request.post("/auth/guest").expect(201, (err, res) => {
//         expect(res.body.data.accessToken).toBeDefined();
//         user2.setAccessToken(res.body.data.accessToken);
//         done();
//       });
//     });

//     test(`Should get access token user3`, (done) => {
//       request.post("/auth/guest").expect(201, (err, res) => {
//         expect(res.body.data.accessToken).toBeDefined();
//         user3.setAccessToken(res.body.data.accessToken);
//         done();
//       });
//     });
//   });

//   describe("Connect", () => {
//     test("Should connect to socket", (done) => {
//       user1.connectSocket();
//       user2.connectSocket();
//       user3.connectSocket();

//       setTimeout(() => {
//         expect(user1.socket?.connected).toBe(true);
//         expect(user2.socket?.connected).toBe(true);
//         expect(user3.socket?.connected).toBe(true);
//         done();
//       }, 500);
//     });
//   });

//   roomActions("Room actions", user1, user2, user3, roomCode);

//   roomActions("Repeat room actions", user1, user2, user3, roomCode);

//   describe("Disconnect", () => {
//     test("Should disconnect from socket", (done) => {
//       user1.socket?.disconnect();
//       user2.socket?.disconnect();
//       user3.socket?.disconnect();

//       expect(user1.socket?.connected).toBe(false);
//       expect(user2.socket?.connected).toBe(false);
//       expect(user3.socket?.connected).toBe(false);
//       done();
//     });
//   });
// });

// function roomActions(
//   name: string,
//   user1: User,
//   user2: User,
//   user3: User,
//   roomCode: string
// ) {
//   describe(name, () => {
//     test(`Should create room client${user1._id.slice(0, 5)}`, (done) => {
//       user1.socket?.on("player_data", (res) => {
//         expect(res.data.player).toBeDefined();
//       });

//       user1.socket?.emit("create_room", "tic_tac_toe", (res: any) => {
//         expect(res.data).toBeDefined();
//         roomCode = res.data.room.roomCode;
//         done();
//       });
//     });

//     test(`Should not be able to create room when already in a room`, (done) => {
//       user1.socket?.emit("create_room", "tic_tac_toe", {}, (res: any) => {
//         expect(res.success).toBe(false);
//         expect(res.error).toBeDefined();
//         done();
//       });
//     });

//     test(`Should join room client${user2._id.slice(0, 5)}`, (done) => {
//       user2.socket?.on("player_data", (res) => {
//         expect(res.data.player).toBeDefined();
//       });

//       user1.socket?.on("player_joined", (res) => {
//         expect(res.data.room).toBeDefined();
//         done();
//       });

//       user2.socket?.emit(
//         "join_room",
//         "tic_tac_toe",
//         { roomCode: roomCode },
//         (res: any) => {
//           expect(res.data).toBeDefined();
//         }
//       );
//     });

//     test(`Should not be able to join room when already in a room`, (done) => {
//       user2.socket?.emit(
//         "join_room",
//         "tic_tac_toe",
//         { roomCode: roomCode },
//         (res: any) => {
//           expect(res.success).toBe(false);
//           expect(res.error).toBeDefined();
//           done();
//         }
//       );
//     });

//     test(`Should not be able to join room when room is full`, (done) => {
//       user3.socket?.emit(
//         "join_room",
//         "tic_tac_toe",
//         { roomCode: roomCode },
//         (res: any) => {
//           expect(res.success).toBe(false);
//           expect(res.error).toBeDefined();
//           done();
//         }
//       );
//     });

//     test(`Should leave room client${user2._id.slice(0, 5)}`, (done) => {
//       user1.socket?.on("player_lefted", (res) => {
//         expect(res.success).toBe(true);
//         user1.socket?.emit("leave_room", "tic_tac_toe");

//         setTimeout(() => {
//           done();
//         }, 500);
//       });

//       user2.socket?.emit("leave_room", "tic_tac_toe");
//     });

//     test(`Should not be able to leave room when not in a room`, (done) => {
//       user3.socket?.emit("leave_room", "tic_tac_toe", {}, (res: any) => {
//         expect(res.success).toBe(false);
//         expect(res.error).toBeDefined();
//         done();
//       });
//     });
//   });
// }

// describe("Tic Tac Toe public room", () => {
//   user4 = new User();
//   user5 = new User();

//   let randomRoomCode: string = "";

//   describe("Get access token", () => {
//     test("Should get access token user4", (done) => {
//       request.post("/auth/guest").expect(201, (err, res) => {
//         expect(res.body.data.accessToken).toBeDefined();
//         user4.setAccessToken(res.body.data.accessToken);
//         done();
//       });
//     });

//     test("Should get access token user5", (done) => {
//       request.post("/auth/guest").expect(201, (err, res) => {
//         expect(res.body.data.accessToken).toBeDefined();
//         user5.setAccessToken(res.body.data.accessToken);
//         done();
//       });
//     });
//   });

//   describe("Connect", () => {
//     test("Should connect to socket", (done) => {
//       user4.connectSocket();
//       user5.connectSocket();

//       setTimeout(() => {
//         expect(user4.socket?.connected).toBe(true);
//         expect(user5.socket?.connected).toBe(true);
//         done();
//       }, 500);
//     });
//   });

//   describe("Room actions", () => {
//     describe("Create or join room", () => {
//       test("Should create random room", (done) => {
//         user4.socket?.emit("random_room", "tic_tac_toe", {}, (res: any) => {
//           expect(res.data.room.roomCode).toBeDefined();
//           randomRoomCode = res.data.room.roomCode;
//           done();
//         });
//       });

//       test("Should join random room", (done) => {
//         user5.socket?.emit("random_room", "tic_tac_toe", {}, (res: any) => {
//           expect(res.data.room.roomCode).toBeDefined();
//           expect(res.data.room.roomCode).toBe(randomRoomCode);
//           done();
//         });
//       });

//       test("Should not be able to join random room when already in a room", (done) => {
//         user5.socket?.emit("random_room", "tic_tac_toe", {}, (res: any) => {
//           expect(res.success).toBe(false);
//           expect(res.error).toBeDefined();
//           done();
//         });
//       });
//     });

//     describe("Game actions", () => {
//       let isGameEnded = false;

//       for (let i = 0; i < 10; i++) {
//         test(`Should be able to make move ${i}`, (done) => {
//           user4.socket?.on("game_result", (res: any) => {
//             expect(res.data.result).toBeDefined();
//             isGameEnded = true;
//             done();
//           });

//           user5.socket?.on("game_result", (res: any) => {
//             expect(res.data.result).toBeDefined();
//             isGameEnded = true;
//             done();
//           });

//           if (i % 2 === 0) {
//             user4.socket?.emit(
//               "make_move",
//               "tic_tac_toe",
//               { cell: i },
//               (res: any) => {
//                 if (isGameEnded) {
//                   expect(res.success).toBe(false);
//                   expect(res.error).toBeDefined();
//                   done();
//                 } else {
//                   expect(res.success).toBe(true);
//                   expect(res.data.room.board).toBeDefined();
//                   expect(res.data.room.board[i]).toBe("X");
//                   done();
//                 }
//               }
//             );
//           } else {
//             user5.socket?.emit(
//               "make_move",
//               "tic_tac_toe",
//               { cell: i },
//               (res: any) => {
//                 if (isGameEnded) {
//                   expect(res.success).toBe(false);
//                   expect(res.error).toBeDefined();
//                   done();
//                 } else {
//                   expect(res.success).toBe(true);
//                   expect(res.data.room.board).toBeDefined();
//                   expect(res.data.room.board[i]).toBe("O");
//                   done();
//                 }
//               }
//             );
//           }
//         });
//       }
//     });

//     describe("Leave room", () => {
//       test("Should leave random room", (done) => {
//         user5.socket?.emit("leave_room", "tic_tac_toe", {}, (res: any) => {
//           expect(res.success).toBe(true);
//           done();
//         });
//       });

//       test("Should not be able to leave random room when not in a room", (done) => {
//         user5.socket?.emit("leave_room", "tic_tac_toe", {}, (res: any) => {
//           expect(res.success).toBe(false);
//           expect(res.error).toBeDefined();
//           done();
//         });
//       });

//       test("Should join random room after leaving", (done) => {
//         user5.socket?.emit("random_room", "tic_tac_toe", {}, (res: any) => {
//           expect(res.data.room.roomCode).toBeDefined();
//           expect(res.data.room.roomCode).not.toBe(randomRoomCode);
//           done();
//         });
//       });
//     });
//   });

//   describe("Disconnect", () => {
//     test("Should disconnect from socket", (done) => {
//       user4.socket?.disconnect();
//       user5.socket?.disconnect();

//       expect(user4.socket?.connected).toBe(false);
//       expect(user5.socket?.connected).toBe(false);
//       done();
//     });
//   });
// });

// afterAll(() => {
//   clearDb();
// });

describe("Tic Tac Toe", () => {
});
