import express from "express";

import gameRouter from "./game";
const router = express.Router();

router.use("/games", gameRouter);

export default router;
