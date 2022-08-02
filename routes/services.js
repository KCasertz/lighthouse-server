const router = require("express").Router();
const Service = require("../models/service.js");
const Review = require("../models/review");

//GET all services
router.get("/", (req, res) => {
  console.log("all services router working");
  Service.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

//GET a specific service using id in url
router.get("/service/:serviceId", (req, res) => {
  console.log(" get by service id router working");
  Service.find({ _id: req.params.serviceId })
    .then((result) => {
      res.status(200).send(result[0]);
    })
    .catch((err) => console.log(err));
});

//GET an array of services which use criteria in body to filter out matches based on delivery method, distance from home (if f2f) and availability match.

// router.get("/filtered", (req, res) => {
//   console.log("get filtered array of services route working");

//   //find all services that match delivery method/s in req.body and create an array of these

//   //only if user submitted pref for f2f, videoCalls and calls filter by all 3 params
//   if (req.body.ftf && !!req.body.videoCalls && !!) {
//     const filterOneArray =  Service.find(
//         { $or: [{ftf: true}, {videoCalls: true}, {calls: true}] },
//         (err, service) => {
//           if (err) {
//             res.send(err);
//           } else if (!!service) {
//             res.json({ message: "no services match your criteria" });
//           } else {
//             console.log(service);
//             res.json(service);
//           }
//         }
//       );

//   if (req.body.ftf && req.body.videoCalls && req.body.calls) {
//   const filterOneArray =  Service.find(
//       { $or: [{ftf: true}, {videoCalls: true}, {calls: true}] },
//       (err, service) => {
//         if (err) {
//           res.send(err);
//         } else if (!!service) {
//           res.json({ message: "no services match your criteria" });
//         } else {
//           console.log(service);
//           res.json(service);
//         }
//       }
//     );
//   }

//  }

// });

//DELETE a service
router.delete("/:serviceId", (req, res) => {
  console.log("delete service router working");
  Service.findByIdAndDelete(req.params.serviceId)
    .then((result) => {
      res.status(200).json({ deletedServiceId: req.params.serviceid });
      //in front-end, use redirect as follows
      //.then for 2nd time after getting response, .then ((data) => {window.location.href = data.redirect}) .catch
    })
    .catch((err) => console.log(err));

  //delete all reviews assoc with it too
  Review.deleteMany({ serviceId: req.params.serviceId }).then((result) => {
    res.status(200).json({ redirect: "/" });
  });
});

//POST - add a new service to the db
router.post("/", (req, res) => {
  console.log("post new service route working");
  console.log(req.body);
  const service = new Service({
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
      long: req.body.long,
      lat: req.body.lat,
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
  });

  service
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//PUT/PATCH update a service

module.exports = router;
