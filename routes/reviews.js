const router = require("express").Router();
const Review = require("../models/review");

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

  review
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
