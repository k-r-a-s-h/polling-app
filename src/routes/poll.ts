import { Router } from "express";
import PollController from "../controller/PollController";

const router = Router();
const pollController = new PollController();
router.post("/",pollController.createPoll);
export default router;