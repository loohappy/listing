import express from "express";
import { addListing, getAllListings } from "../controllers/listing";
import multer, { Multer } from "multer";

const router = express.Router();
const upload: Multer = multer({ dest: "./uploads/" });

// Route to add a new listing
router.post("/create", upload.single("image"), addListing);

// Route to get all listings
router.get("/listings", getAllListings);

export default router;
