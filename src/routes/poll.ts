import { Router } from "express";
import PollController from "../controller/PollController";

const router = Router();
const pollController = new PollController();
router.post("/",pollController.createPoll);
router.get("/:id",pollController.getPollById);
export default router;