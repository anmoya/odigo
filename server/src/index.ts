import express from "express";

import testRouter from "./routes/test";
import userRouter from "./routes/user"

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/healtcheck", (_req, res) => {
  console.log("ok");
  res.send("healty");
});

app.use("/api/test", testRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
