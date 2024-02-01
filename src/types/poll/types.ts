export interface PollDTO {
    question: string;
    description: string;
    expiryDate: Date;
    answers: AnswerDTO[];
}

export interface AnswerDTO {
    answer: string;
}

export interface Poll {
    id: string;
    description: string;
    expiryDate: Date;
    question: string;
    createdBy: string;
    answers: Answer[];
}

export interface Answer extends AnswerDTO{
    id: string;
    pollId: string;
}