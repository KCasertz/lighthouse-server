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
    ratings: Array,
    summary: {
      type: String,
      required: true,
      maxLength: 500,
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
      type: Boolean,
      required: true,
    },
    email: String,
    phone: String,
    website: String,
    location: {
      type: {
        long: String,
        lat: String,
      },
      required: true,
    },
    ftf: {
      type: Boolean,
      required: true,
    },
    calls: {
      type: Boolean,
      required: true,
    },
    videoCalls: {
      type: Boolean,
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
      type: [
        { MonAM: Boolean },
        { MonPM: Boolean },
        { MonEve: Boolean },
        { TueAM: Boolean },
        { TuePM: Boolean },
        { TueEve: Boolean },
        { WedAM: Boolean },
        { WedPM: Boolean },
        { WedEve: Boolean },
        { ThuAM: Boolean },
        { ThuPM: Boolean },
        { ThuEve: Boolean },
        { FriAM: Boolean },
        { FriPM: Boolean },
        { FriEve: Boolean },
        { SatAM: Boolean },
        { SatPM: Boolean },
        { SatEve: Boolean },
        { SunAM: Boolean },
        { SunPM: Boolean },
        { SunEve: Boolean },
      ],
      required: true,
    },
    bookDirect: Boolean,
    bookingLink: String,
    imageUrl: String,
    slidingScale: Boolean,
    pricePerHour: Number,
  },
  { timestamps: true }
);

const Therapist = mongoose.model("Therapist", therapistSchema);

module.exports = Therapist;
