const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    dateCreated: { type: Date, default: Date.now },
    description: {
      type: String,
      required: true,
    },
    ratings: Array,
    overallRating: Number,
    summary: {
      type: String,
      required: true,
    },
    waitingTimeMonths: {
      type: Number,
      required: true,
    },
    lgbtq: {
      type: Boolean,
      required: true,
    },
    accessible: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
