import {Router} from "express";

const router = Router();

router.get("/friends", (req, res) => {
    res.send("Friends Route");
    }
);



export default router;