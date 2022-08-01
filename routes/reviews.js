const router = require("express").Router();
const Review = require("../models/review");

//GET all reviews for a specific service id
router.get("/", (req, res) => {
  console.log("reviews router working");
  Review.find({ serviceId: "62e82097c67bcfb01173987a" })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

//GET a specific review using id in url

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
