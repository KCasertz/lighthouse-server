const router = require("express").Router();
const Review = require("../models/review");
const Service = require("../models/service.js");

//GET a specific review using id in url (useful to delete it later)
router.get("/review-id/:reviewId", (req, res) => {
  console.log("reviewID router working");
  Review.find({ _id: req.params.reviewId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

//GET all reviews for a specific service id
router.get("/service-id/:serviceId", (req, res) => {
  console.log("reviews router working");
  Review.find({ serviceId: req.params.serviceId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

//DELETE a review
router.delete("/:reviewId/delete", (req, res) => {
  console.log("router working");

  Review.findById({ _id: req.params.reviewId })
    .then((result) => {
      const { rating, serviceId, waitingTime } = result;

      Service.findOneAndUpdate(
        { _id: serviceId },
        { $pull: { ratings: rating, waitingTime: waitingTime } },
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
          }
        }
      );
    })
    .catch((err) => console.log(err));

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
    waitingTime: req.body.waitingTime,
    research: req.body.research,
    email: req.body.email,
  });

  Service.findOneAndUpdate(
    { _id: req.body.serviceId },
    { $push: { ratings: req.body.rating, waitingTime: req.body.waitingTime } },
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

module.exports = router;
