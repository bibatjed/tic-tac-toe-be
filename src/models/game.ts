import { Schema, model } from "mongoose";

interface IPlayerData {
  name: string;
  wins: number;
  losses: number;
  draws: number;
}

interface IGame {
  player1: IPlayerData;
  player2: IPlayerData;
  createdAt: Date;
}

const playerDataSchema = new Schema<IPlayerData>({
  name: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
  losses: {
    type: Number,
    required: true,
  },
  draws: {
    type: Number,
    required: true,
  },
});

const gameSchema = new Schema<IGame>({
  player1: {
    type: playerDataSchema,
    required: true,
  },

  player2: {
    type: playerDataSchema,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Game = model<IGame>("Game", gameSchema);

export default Game;
