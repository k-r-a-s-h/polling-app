import { Poll, PollDTO } from "../../services/pollService/types";
import prisma from "../prisma";

export class PollRepository {
    async createPoll(pollRequest:PollDTO):Promise<Poll> {
        try {
            const poll = await prisma.poll.create({
                data: {
                    description: pollRequest.description,
                    expiryDate: pollRequest.expiryDate,
                    question: pollRequest.question,
                    // Hardcoding value till we implement user authentication 
                    createdBy: "5ac0dff3-8085-49d7-b69d-a2d070702265",
                    answers: {
                        create: pollRequest.answers
                    }
                },
                include: {
                    answers: true
                }
            },);
            return poll;
        } catch (err) {
            console.error(`[PollRepository.createPoll]`,err);
            throw err;
        }
    }

    async getPollById(id:string):Promise<Poll | null> {
        try {
            const poll = await prisma.poll.findUnique({
                where: {
                    id
                },
                include: {
                    answers: true
                }
            });
            return poll;
        } catch (err) {
            console.error(`[PollRepository.getPollById]`,err);
            throw err;
        }
    }
}