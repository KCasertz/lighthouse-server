const router = require("express").Router();
const Service = require("../models/service.js");
const Review = require("../models/review");
const geolib = require("geolib");
const helpers = require("../helpers/helpers.js");

//GET a specific service using id in url
router.get("/:serviceId", (req, res) => {
  Service.find({ _id: req.params.serviceId })
    .then((result) => {
      res.status(200).send(result[0]);
    })
    .catch((err) => console.log(err));
});

//GET all services
router.get("/", (req, res) => {
  Service.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

//GET an array of services which use criteria in body to filter out matches based on delivery method, distance from home (if f2f) and availability match.
const checkHowManySlotsmMatch = (userAvailArr, serviceAvailArr) => {
  let matchesCounter = 0;
  userAvailArr.forEach((timeslot, i) => {
    if (timeslot === false) {
    } else if (timeslot === serviceAvailArr[i]) {
      matchesCounter = matchesCounter + 1;
    }
  });

  return matchesCounter;
};

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

router.post("/filtered", async (req, res) => {
  if (!req.body.deliveryMethod || !req.body.availability) {
    return res.status(400).json({
      errorMessage:
        "Please ensure you have provided a delivery method and availability array of all 21 timeslots and in the correct formats.",
    });
  }

  try {
    const { deliveryMethod, availability } = req.body;

    const services = await Service.find({
      deliveryMethod: req.body.deliveryMethod,
    });
    const results = services.filter((service) => {
      const isAvailable =
        checkHowManySlotsmMatch(availability, service.availability) > 0;

      if (!isAvailable) {
        return false;
      }

      if (deliveryMethod !== "ftf") {
        return true;
      }

      return isWithinRadius(
        req.body.location.long,
        req.body.location.lat,
        service.location.coordinates[0],
        service.location.coordinates[1],
        req.body.maxRad
      );
    });
    res.status(200).send({ results, error: false });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: true });
  }
});

//DELETE a service
router.delete("/:serviceId", (req, res) => {
  Service.findByIdAndDelete(req.params.serviceId)
    .then((result) => {
      res.status(200).json({ deletedServiceId: req.params.serviceid });
    })
    .catch((err) => console.log(err));

  Review.deleteMany({ serviceId: req.params.serviceId }).then((result) => {
    res.status(200).json({ serviceIdForDeletedReviews: req.params.serviceId });
  });
});

//POST - add a new service to the db
router.post("/", (req, res) => {
  const service = new Service({
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

//PUT/PATCH update a service - on frontend, form would pull in existing values and then create new object with all fields including updated ones.
router.put("/update/:serviceId", (req, res) => {
  Service.findOneAndUpdate(
    { _id: req.params.serviceId },
    {
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
