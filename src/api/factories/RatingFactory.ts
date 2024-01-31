import { getRepository } from "@/api/Repositories";
import { Ratings } from "@/types/entities";

const getRatingRepository = getRepository("rating");

export async function getRatingsForUser(userID: string): Promise<Ratings> {
  return await getRatingRepository().getRatingsForUser(userID);
}
