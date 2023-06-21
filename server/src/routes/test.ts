import express from "express";

import { getTests } from "../services/test";

const router = express.Router();

router.get("/", (_req, res) => {
  const tests = getTests();
  res.send(tests);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Fetching ${id} test`);
});

router.post("/", (_req, res) => {
  res.send("Creating a test");
});

router.put("/", (_req, res) => {
  res.send("updating a test");
});

router.delete("/", (_req, res) => {
  res.send("remove a test");
});

export default router;
