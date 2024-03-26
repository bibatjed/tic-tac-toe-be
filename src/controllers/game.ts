import Game from "../models/game";
import { NextFunction, Request, Response } from "express";
import { validatePostGame } from "../validate/game";

export const getGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    try {
      const [game, count] = await Promise.all([
        Game.find()
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit),
        Game.countDocuments(),
      ]);

      const totalPages = Math.ceil(count / limit);
      return res.json({
        pages: totalPages,
        result: game,
      });
    } catch (err) {
      return next(err);
    }
  } catch (e) {}
};

export const postGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validatePostGame(req.body);

    const game = new Game({
      ...req.body,
    });

    await game.save();

    return res.json({ message: "Success" });
  } catch (err) {
    return next(err);
  }
};
