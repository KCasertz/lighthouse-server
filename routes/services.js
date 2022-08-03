const router = require("express").Router();
const Service = require("../models/service.js");
const Review = require("../models/review");
const geolib = require("geolib");

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

//create function that maps through an array of booleans for availability within timeslots (in specific order am, pm, eve for mon-sun) and compares the users responses to availability to the same index position in the service's availability array of objects, and increments a counter to signify whether a user's availability matches the services. If at least one match, it returns true. If user has said they are not available aka a false in their array, it does not increment the counter despite it being a match.

const checkHowManySlotsmMatch = (userAvailArr, serviceAvailArr) => {
  let matchesCounter = 0;
  userAvailArr.forEach((timeslot, i) => {
    console.log("timeslot: ", timeslot);
    console.log("serviceAvailArr[i]:", serviceAvailArr[i]);
    if (timeslot === false) {
      console.log("timeslot was false");
    } else if (timeslot === serviceAvailArr[i]) {
      matchesCounter = matchesCounter + 1;
    }
  });

  return matchesCounter;
};

//testing the function above
// const testArray = [false, false, true, false, false, true];
// const testArrayTwo = [false, false, true, false, false, true];

// console.log("functiontest:", checkHowManySlotsmMatch(testArrayTwo, testArray));

//create function that filters array by distance between user-submitted long and lat, and the service location
const filterByRadius = (array, long, lat, maxRad) => {
  console.log("got into filter by radius function");
  let arrayFilteredByDistance = [];

  array.map((service) => {
    const maxRadM = maxRad * 1000;
    if (
      geolib.isPointWithinRadius(
        {
          latitude: lat,
          longitude: long,
        },
        {
          latitude: service.location.coordinates[1],
          longitude: service.location.coordinates[0],
        },
        maxRadM
      )
    ) {
      arrayFilteredByDistance.push(service);
      return;
    }
    return "didn't match";
  });

  return arrayFilteredByDistance;
};

router.get("/filtered", (req, res) => {
  console.log("got into filter route");

  //First create array of services sorting by delivery method submitted by user

  Service.find({ deliveryMethod: req.body.deliveryMethod }, (err, services) => {
    if (services.length === 0) {
      res.json({
        message:
          "Sorry, no services match your criteria. Please try using different criteria.",
      });
    } else if (services) {
      console.log("services: ", services);
      if (req.body.deliveryMethod === "ftf") {
        const filterTwoArray = filterByRadius(
          services,
          req.body.location.long,
          req.body.location.lat,
          req.body.maxRadius
        );
        console.log("filterTwoArray: ", filterTwoArray);

        if (filterTwoArray.length === 0) {
          res.json({
            message:
              "Sorry, no services match your criteria. Please try using different criteria.",
          });
        } else {
          console.log("filterTwoArray has items inside");
          const filterThreeArray = [];
          filterTwoArray.map((service) => {
            if (
              checkHowManySlotsmMatch(
                req.body.availability,
                service.availability
              ) > 0
            ) {
              filterThreeArray.push(service);
            } else {
              return;
            }
          });
          console.log("filterThreeArray: ", filterThreeArray);
          res.status(200).send(filterThreeArray);
        }
      } else if (req.body.deliveryMethod !== "ftf") {
        console.log("not ftf so skipping straight to filter by availability");

        const filterFourArray = services.map((service) => {
          if (
            checkHowManySlotsmMatch(
              req.body.availability,
              service.availability
            ) > 0
          ) {
            return service;
          } else {
            return;
          }
        });
        console.log("filterFourArray: ", filterFourArray);
        res.status(200).send(filterFourArray);
      } else if (err) {
        res.send(err);
      }
    }
  }).catch((err) => console.log(err));
});

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
router.put("/update/:serviceId", (req, res) => {
  console.log("update existing service route working");
  console.log(req.body);

  Service.findOneAndUpdate(
    { _id: req.params.serviceId },
    {
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
    },
    { new: true }
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
