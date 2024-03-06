import { Request, Response } from "express";
import Listing from "../models/listing"; // Import the Mongoose model
import AWS from "aws-sdk";
import fs from "fs";
const s3 = new AWS.S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
export const addListing = async (req: Request, res: Response) => {
  try {
    const { name, about } = req.body;
    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    console.log(file);
    // Read file data
    const fileData = fs.createReadStream(file.path);
    console.log(fileData, "filedata");
    const params = {
      Bucket: "happylooh",
      Body: fileData,
      Key: file.originalname,
    };

    const data = await s3.upload(params).promise();
    console.log(data);
    const imageURL = data.Location;

    const newListing = new Listing({ name, about, imageURL });
    const savedListing = await newListing.save();

    res.status(201).json(savedListing);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message, err: error });
  }
};

// Controller function to get all listings
export const getAllListings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: "Failed to get listings" });
  }
};
