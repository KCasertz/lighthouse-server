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
      req.body.availability[0],
      req.body.availability[1],
      req.body.availability[2],
      req.body.availability[3],
      req.body.availability[4],
      req.body.availability[5],
      req.body.availability[6],
      req.body.availability[7],
      req.body.availability[8],
      req.body.availability[9],
      req.body.availability[10],
      req.body.availability[11],
      req.body.availability[12],
      req.body.availability[13],
      req.body.availability[14],
      req.body.availability[15],
      req.body.availability[16],
      req.body.availability[17],
      req.body.availability[18],
      req.body.availability[19],
      req.body.availability[20],
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
