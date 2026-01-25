import express from "express";
import listing from "../models/listing.js";
import keyword_extractor from "keyword-extractor";


router.post("/lost", createLostItem);
router.post("/found", createFoundItem);
router.get("/matches", getMatches);
router.get("/report", getListingReport);


const router = express.Router();