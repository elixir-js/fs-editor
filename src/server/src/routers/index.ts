import * as express from "express";
import * as path from "path";
import { router as fileRouter } from "./file-io";

export const router = express.Router();
router
  .get("/serve", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "../../../files/index.html"));
  })
  .use("/io", fileRouter);
