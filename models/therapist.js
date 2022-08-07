const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const therapistSchema = new Schema(
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
      maxLength: 500,
    },
    ratings: [Number],
    summary: {
      type: String,
      required: true,
      maxLength: 500,
    },
    waitingTime: [Number],
    lgbtq: {
      type: Boolean,
      required: true,
    },
    accessible: {
      type: Boolean,
      required: true,
    },
    email: String,
    phone: String,
    website: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    deliveryMethod: {
      type: String,
      required: true,
    },
    group: {
      type: Boolean,
      required: true,
    },
    individual: {
      type: Boolean,
      required: true,
    },
    availability: {
      type: Array,
      required: true,
    },
    bookDirect: Boolean,
    bookingLink: String,
    imageUrl: String,
    slidingScale: { type: Boolean, required: true },
    pricePerHour: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Therapist = mongoose.model("Therapist", therapistSchema);

module.exports = Therapist;
