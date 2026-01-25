import express from "express"
import listing from "../models/listing.js"
import keyword_extractor from "keyword-extractor";


//create lost item
export const createLostItem = async(req, res) => {
    try {
        const { title , description , img , location  } = req.body;
        
        if(!title || !description || !location){
            return res.status(400).json({ error: "All fields are required" });
        }
        

        //extract keywords
        const keywords = keyword_extractor.extract(description, {
            language : "english",
            remove_digits : true,
            return_changed_case : true,
            remove_duplicates : false
        });
        
        const item = await listing.create({
            title,
            description,
            descriptionArr : keywords,
            img :img || "",
            location,
            status : "Lost",
            Author : [req.user.id]   
        });


        res.status(201).json({ 
            message: "Item created successfully", 
            item 
        });
        
    } catch (error) {
        res.status(500).json({ 
            message : "error while adding lost item",
            error: err.message 
        });
    }
}

//create found item

export const createFoundItem = async (req, res) => {
  try {
    const { title, description, location, img } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const keywords = keyword_extractor.extract(description, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true
    });

    const item = await listing.create({
      title,
      description,
      descriptionArr: keywords,
      img: img || "",
      location,
      status: "Found",
      Author: [req.user.id]
    });

    res.status(201).json({
      message: "Found item created successfully",
      item
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//get listing report
export const getListingReport = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const items = await listing.find({
      Author: userId
    }).sort ({ createdAt: -1 });

    res.status(200).json({
      message: "Listing report fetched successfully",
      total: items.length,
      items
    });

  } catch(error) {
    res.status(500).json({ 
      message : "error in getting listing report",
      error: error.message });
  }
}


//get matches items 

export const getMatches = async (req, res) => {
  try {
    const lostItems = await Listing.find({ status: "Lost" });
    const foundItems = await Listing.find({ status: "Found" });

    let matches = [];

    for (let lost of lostItems) {
      for (let found of foundItems) {
        if (lost.location !== found.location) continue;

        const commonWords = lost.descriptionArr.filter(word =>
          found.descriptionArr.includes(word)
        );

        if (commonWords.length >= 3) {
          matches.push({
            lostItem: lost,
            foundItem: found,
            matchCount: commonWords.length
          });
        }
      }
    }

    res.json({
      totalMatches: matches.length,
      matches
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
