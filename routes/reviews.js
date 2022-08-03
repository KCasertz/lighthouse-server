const router = require("express").Router();
const Review = require("../models/review");
const Service = require("../models/service.js");

//GET a specific review using id in url (useful to delete it later)
router.get("/:reviewId", (req, res) => {
  console.log("reviewID router working");
  Review.find({ _id: req.params.reviewId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

//GET all reviews for a specific service id
router.get("/:serviceId", (req, res) => {
  console.log("reviews router working");
  Review.find({ serviceId: req.params.serviceId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

//DELETE a review
router.delete("/:reviewId", (req, res) => {
  console.log("router working");
  Review.findByIdAndDelete({ _id: req.params.reviewId })
    .then((result) => {
      res.status(200).json({ redirect: "/" });
      //in front-end, use redirect as follows
      //.then for 2nd time after getting response, .then ((data) => {window.location.href = data.redirect}) .catch
    })
    .catch((err) => console.log(err));
});

//POST - add a new review to a service and update the service rating array
router.post("/:serviceId/post-review", (req, res) => {
  const review = new Review({
    name: req.body.name,
    review: req.body.review,
    rating: req.body.rating,
    serviceId: req.params.serviceId,
    dateReferred: req.body.dateReferred,
    dateAccessed: req.body.dateAccessed,
  });

  Service.findOneAndUpdate(
    { _id: req.body.serviceId },
    { $push: { ratings: req.body.rating } },
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    }
  );

  review
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//PUT/PATCH an existing review (not sure I will use this)

module.exports = router;
