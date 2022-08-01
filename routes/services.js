const router = require("express").Router();
const Service = require("../models/service.js");

//GET all services
router.get("/", (req, res) => {
  console.log("router working");
  Service.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

//GET a specific service using id in url
router.get("/:serviceId", (req, res) => {
  console.log("router working");
  Service.find({ _id: req.params.serviceId })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

//DELETE a service
router.delete("/:serviceId", (req, res) => {
  console.log("router working");
  Service.findByIdAndDelete({ _id: req.params.serviceId })
    .then((result) => {
      res.status(200).json({ redirect: "/" });
      //in front-end, use redirect as follows
      //.then for 2nd time after getting response, .then ((data) => {window.location.href = data.redirect}) .catch
    })
    .catch((err) => console.log(err));
});
//delete all reviews assoc with it too

//POST - add a new service to the db
router.post("/services", (req, res) => {
  const service = new Service({
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

  service
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//PUT/PATCH update a service

module.exports = router;
