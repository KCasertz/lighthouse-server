const router = require("express").Router();
const Therapist = require("../models/therapist.js");

//GET all therapists
router.get("/", (req, res) => {
  console.log("router working");
  Therapist.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

//GET a specific therapist using id in url
router.get("/:therapistId", (req, res) => {
  console.log("therapist by id router working");
  Therapist.find({ _id: req.params.therapistId })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

//DELETE a therapist
router.delete("/:therapistId", (req, res) => {
  console.log("router working");
  Therapist.findByIdAndDelete({ _id: req.params.therapistId })
    .then((result) => {
      res.status(200).json({ redirect: "/" });
      //in front-end, use redirect as follows
      //.then for 2nd time after getting response, .then ((data) => {window.location.href = data.redirect}) .catch
    })
    .catch((err) => console.log(err));
});

//POST - add a new therapist to the db
router.post("/", (req, res) => {
  const therapist = new Therapist({
    name: req.body.name,
    summary: req.body.summary,
    description: req.body.description,
    ratings: req.body.ratings,
    waitingTimeMonths: req.body.waitingTimeMonths,
    lgbtq: req.body.lgbtq,
    accessible: req.body.accessible,
    email: req.body.email,
    phone: req.body.phone,
    website: req.body.website,
    location: {
      type: "Point",
      coordinates: [req.body.location.long, req.body.location.lat],
    },
    deliveryMethod: req.body.deliveryMethod,
    group: req.body.group,
    individual: req.body.individual,
    availability: [
      { MonAM: req.body.availability[0].MonAM },
      { MonPM: req.body.availability[1].MonPM },
      { MonEve: req.body.availability[2].MonEve },
      { TueAM: req.body.availability[3].TueAM },
      { TuePM: req.body.availability[4].TuePM },
      { TueEve: req.body.availability[5].TueEve },
      { WedAM: req.body.availability[6].WedAM },
      { WedPM: req.body.availability[7].WedPM },
      { WedEve: req.body.availability[8].WedEve },
      { ThuAM: req.body.availability[9].ThuAM },
      { ThuPM: req.body.availability[10].ThuPM },
      { ThuEve: req.body.availability[11].ThuEve },
      { FriAM: req.body.availability[12].FriAM },
      { FriPM: req.body.availability[13].FriPM },
      { FriEve: req.body.availability[14].FriEve },
      { SatAM: req.body.availability[15].SatAM },
      { SatPM: req.body.availability[16].SatPM },
      { SatEve: req.body.availability[17].SatEve },
      { SunAM: req.body.availability[18].SunAM },
      { SunPM: req.body.availability[19].SunPM },
      { SunEve: req.body.availability[20].SunEve },
    ],
    bookDirect: req.body.bookDirect,
    bookingLink: req.body.bookingLink,
    imageUrl: req.body.imageUrl,
    slidingScale: req.body.slidingScale,
    pricePerHour: req.body.pricePerHour,
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
