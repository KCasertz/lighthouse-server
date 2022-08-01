const router = require("express").Router();

//GET all services
router.get("/", (_, res) => {
  console.log("router working");
});

module.exports = router;
