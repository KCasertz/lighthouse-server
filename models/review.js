const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateCreated: { type: Date, default: Date.now },
    review: {
      type: String,
      required: true,
    },
    rating: Number,
    serviceId: String,
    dateReferred: Date,
    dateAccessed: Date,
    waitingTimeMonths: String,
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
