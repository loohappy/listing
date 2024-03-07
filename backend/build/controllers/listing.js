"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllListings = exports.addListing = void 0;
const listing_1 = __importDefault(require("../models/listing")); // Import the Mongoose model
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const s3 = new aws_sdk_1.default.S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const addListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, about } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        console.log(file);
        // Read file data
        const fileData = fs_1.default.createReadStream(file.path);
        console.log(fileData, "filedata");
        const params = {
            Bucket: "happylooh",
            Body: fileData,
            Key: file.originalname,
        };
        const data = yield s3.upload(params).promise();
        console.log(data);
        const imageURL = data.Location;
        const newListing = new listing_1.default({ name, about, imageURL });
        const savedListing = yield newListing.save();
        res.status(201).json(savedListing);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message, err: error });
    }
});
exports.addListing = addListing;
// Controller function to get all listings
const getAllListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listings = yield listing_1.default.find();
        res.json(listings);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get listings" });
    }
});
exports.getAllListings = getAllListings;
