import mongoose, { Schema, Document } from "mongoose";

// Define the schema for the listing
interface IListing extends Document {
  name: string;
  about: string;
  imageURL: string;
}

const listingSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const Listing = mongoose.model<IListing>("Listing", listingSchema);

export default Listing;
