import express from "express";

export const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Matrio socket server", version: "1.0.0" });
});

router.get("/health", (req, res) => {
  res.json({ message: "Matrio socket server", version: "1.0.0" });
});

// error handler
router.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);

// not found handler
router.use((req, res) => {
  res.status(404).send("Not found!");
});
