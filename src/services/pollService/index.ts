import { PollRepository } from "../../models/Poll";
import { Poll, PollDTO } from "../../types/poll/types";

export class PollService {
  private pollRepository: PollRepository;
  constructor() {
    this.pollRepository = new PollRepository();
  }
  createPollAndAnswers = async (pollRequest: PollDTO, createdBy: string): Promise<Poll> => {
    try {
      //TODO: validate poll request
      const poll = await this.pollRepository.createPoll(pollRequest,createdBy);
      return poll;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  getPollById = async (id: string): Promise<Poll | null> => {
    try {
      const poll = await this.pollRepository.getPollById(id);
      return poll;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}
