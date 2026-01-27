import express from "express";
import { createLostItem, createFoundItem, getMatches, getListingReport} from "../controllers/listing.js";
import { userProtect } from "../middleware/auth.js";


const router = express.Router();


router.post("/lost",userProtect, createLostItem);
router.post("/found", userProtect, createFoundItem);
router.get("/matches", userProtect, getMatches);
router.get("/report", userProtect, getListingReport);

export default router;
















