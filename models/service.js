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
      type: {
        MonAM: Boolean,
        MonPM: Boolean,
        MonEve: Boolean,
        TueEve: Boolean,
        TueAM: Boolean,
        TuePM: Boolean,
        WedEve: Boolean,
        WedAM: Boolean,
        WedPM: Boolean,
        ThuEve: Boolean,
        ThuAM: Boolean,
        ThuPM: Boolean,
        FriEve: Boolean,
        FriAM: Boolean,
        FriPM: Boolean,
        SatEve: Boolean,
        SatAM: Boolean,
        SatPM: Boolean,
        SunEve: Boolean,
        SunAM: Boolean,
        SunPM: Boolean,
      },
      required: true,
    },
    bookDirect: Boolean,
    bookingLink: String,
    imageUrl: String,
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;