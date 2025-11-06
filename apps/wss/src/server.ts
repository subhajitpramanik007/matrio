import { httpServer } from "./app";
import "dotenv/config";
import { checkEnv } from "./common/constants";

try {
  checkEnv();
} catch (error) {
  console.error(error);
}

async function bootstrap() {
  httpServer.listen(8001, () => {
    console.log("Server started on port 8001");
  });

  httpServer.on("error", (error) => {
    console.error("Server error:", error);
  });

  httpServer.on("close", () => {
    console.log("Server closed");
  });
}

bootstrap();
