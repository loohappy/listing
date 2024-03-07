"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listing_1 = require("../controllers/listing");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "./uploads/" });
// Route to add a new listing
router.post("/create", upload.single("image"), listing_1.addListing);
// Route to get all listings
router.get("/listings", listing_1.getAllListings);
exports.default = router;
