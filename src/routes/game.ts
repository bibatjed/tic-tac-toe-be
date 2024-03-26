import express from "express";
import { getGame, postGame } from "../controllers/game";

const router = express.Router();

router.route("/").get(getGame).post(postGame);

export default router;
