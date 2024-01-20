import { PollService } from "../services/pollService";
import { Request, Response } from "express";

export default class PollController{
    private pollService: PollService;
    constructor() {
        this.pollService = new PollService();
    }

    createPoll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { body } = req;
            const poll = await this.pollService.createPollAndAnswers(body);
            return res.json(poll);
        } catch(err) {
            console.error(err);
            return res.json({
                err,
                message: "Something went wrong"
            })
        }
    }
}