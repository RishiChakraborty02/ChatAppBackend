import { Router } from "express";
import { findFriend } from "../controllers/friendsController";

const router = Router();

router.get("/search", findFriend);

export default router;
