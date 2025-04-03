import express from "express";
import auth from "./auth";
import urlShortner from "./url-shortner";

const router = express.Router();

router.use('/auth', auth);
router.use('/shortenurl', urlShortner);

export default router;