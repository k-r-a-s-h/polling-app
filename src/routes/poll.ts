import { Router } from "express";
import PollController from "../controller/PollController";
import { authenticated } from "../middleware/authMiddleware";

const router = Router();
const pollController = new PollController();
router.post("/",authenticated, pollController.createPoll.bind(pollController));
router.get("/:id",authenticated, pollController.getPollById.bind(pollController));
export default router;