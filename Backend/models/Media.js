const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["video", "image"],
      default: "image",
    },
    src: {
      type: String, // Base64 or URL
      required: true,
    },
    thumbnail: {
      type: String, // Base64 or URL, optional
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Media", MediaSchema);
