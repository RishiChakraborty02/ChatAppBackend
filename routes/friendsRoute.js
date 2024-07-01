import { Router } from "express";
import { findFriend } from "../controllers/friendsController";

const router = Router();

router.post("/search", findFriend);

export default router;
