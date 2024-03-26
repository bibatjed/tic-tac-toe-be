import { z } from "zod";

const PlayerData = z.object({
  name: z.string().min(1),
  wins: z.number().min(0),
  losses: z.number().min(0),
  draws: z.number().min(0),
});

export const gameDataSchema = z.object({
  player1: PlayerData,
  player2: PlayerData,
});

export type gameDataType = z.infer<typeof gameDataSchema>;
export const validatePostGame = (data: gameDataType) => {
  return gameDataSchema.parse(data);
};
