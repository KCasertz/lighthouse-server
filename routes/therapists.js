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
    waitingTime: req.body.waitingTime,
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

// find a therapist fiiltering by user criteria

//function to check availability slots match above 0
const checkHowManySlotsmMatch = (userAvailArr, serviceAvailArr) => {
  let matchesCounter = 0;
  userAvailArr.forEach((timeslot, i) => {
    if (timeslot === false) {
      console.log("timeslot was false");
    } else if (timeslot === serviceAvailArr[i]) {
      matchesCounter = matchesCounter + 1;
    }
  });

  return matchesCounter;
};

//function to check within user defined radius
const isWithinRadius = (
  longitude,
  latitude,
  serviceLongitude,
  serviceLatitude,
  radius
) => {
  const kmRadius = radius * 1000;
  return geolib.isPointWithinRadius(
    { longitude, latitude },
    { longitude: serviceLongitude, latitude: serviceLatitude },
    kmRadius
  );
};

//post because query object too complex to send as URL in get request
router.post("/filtered", async (req, res) => {
  console.log("got into filter route");
  console.log(req.body);
  //First create array of services sorting by delivery method submitted by user

  //validation inc regEx for postcode
  if (
    !req.body.deliveryMethod ||
    !req.body.availability
    // req.body.availability.length !== 21 ||
    // !helpers.isValidPostcode(req.body.contact.postcode) ||
    //   !req.body.postcode
  ) {
    return res.status(400).json({
      errorMessage:
        "Please ensure you have provided a delivery method and availability array of all 21 timeslots and in the correct formats.",
    });
  }

  try {
    const { deliveryMethod, availability } = req.body;

    const therapists = await Therapist.find({
      deliveryMethod: req.body.deliveryMethod,
    });
    const results = therapists.filter((therapist) => {
      const isAvailable =
        checkHowManySlotsmMatch(availability, therapist.availability) > 0;

      if (!isAvailable) {
        return false;
      }

      if (deliveryMethod !== "ftf") {
        return true;
      }

      return isWithinRadius(
        req.body.location.long,
        req.body.location.lat,
        therapist.location.coordinates[0],
        therapist.location.coordinates[1],
        req.body.maxRad
      );
    });
    console.log("results sent to frontend: ", results);
    res.status(200).send({ results, error: false });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: true });
  }
});

module.exports = router;
