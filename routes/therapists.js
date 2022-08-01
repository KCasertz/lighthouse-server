const router = require("express").Router();
const Therapist = require("../models/therapist.js");

//GET all therapists
router.get("/", (_, res) => {
  console.log("router working");
});

//GET a specific therapist using id in url

//DELETE a therapist

//POST - add a new therapist to the db
router.post("/", (req, res) => {
  const therapist = new Therapist({
    name: req.body.name,
    summary: req.body.summary,
    description: req.body.description,
    waitingTimeMonths: req.body.waitingTime,
    lgbtq: req.body.lgbtq,
    accessible: req.body.accessibility,
    email: req.body.email,
    phone: req.body.phone,
    website: req.body.website,
    location: {
      long: req.body.long,
      lat: req.body.lat,
    },
    ftf: req.body.ftf,
    calls: req.body.calls,
    videoCalls: req.body.videoCalls,
    group: req.body.group,
    individual: req.body.individual,
    availability: {
      MonAM: req.body.MonAM,
      MonPM: req.body.MonPM,
      MonEve: req.body.MonEve,
      TueEve: req.body.TueEve,
      TueAM: req.body.TueAm,
      TuePM: req.body.TuePM,
      WedEve: req.body.WedEve,
      WedAM: req.body.WedAM,
      WedPM: req.body.WedPM,
      ThuEve: req.body.ThuEve,
      ThuAM: req.body.ThuAM,
      ThuPM: req.body.ThuPM,
      FriEve: req.body.FriEve,
      FriAM: req.body.FriAM,
      FriPM: req.body.FriPM,
      SatEve: req.body.SatEve,
      SatAM: req.body.SatAM,
      SatPM: req.body.SatPM,
      SunEve: req.body.SunEve,
      SunAM: req.body.SunAM,
      SunPM: req.body.SunPM,
    },
    bookDirect: req.body.bookDirect,
    bookingLink: req.body.bookingLink,
    imageUrl: req.body.imageUrl,
  });

  therapist
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
