import { Poll, PollDTO } from "../../types/poll/types";
import prisma from "../prisma";

export class PollRepository {
  async createPoll(pollRequest: PollDTO, createdBy:string): Promise<Poll> {
    try {
      const poll = await prisma.poll.create({
        data: {
          description: pollRequest.description,
          expiryDate: pollRequest.expiryDate,
          question: pollRequest.question,
          createdBy: createdBy,
          answers: {
            create: pollRequest.answers,
          },
        },
        include: {
          answers: true,
        },
      });
      return poll;
    } catch (err) {
      console.error(`[PollRepository.createPoll]`, err);
      throw err;
    }
  }

  async getPollById(id: string): Promise<Poll | null> {
    try {
      const poll = await prisma.poll.findUnique({
        where: {
          id,
        },
        include: {
          answers: true,
        },
      });
      return poll;
    } catch (err) {
      console.error(`[PollRepository.getPollById]`, err);
      throw err;
    }
  }
}
