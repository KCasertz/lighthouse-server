require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3333;
const Service = require("./models/service.js");
const Therapist = require("./models/therapist.js");
const Review = require("./models/review.js");

//connect to MongoDB
const dbURI = `mongodb+srv://katiecaserta:Lighthouse333@lighthouse1.h4zhazg.mongodb.net/LighthouseDB?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //listen to port, only once connected successfully to DB
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

//second argument above with object may not be necessary but if get deprecation errors, this is what resolves

//middleware
app.use(cors());
app.use(express.json());

//link in the router files
const servicesRouter = require("./routes/services.js");
const reviewsRouter = require("./routes/reviews.js");
const therapistsRouter = require("./routes/therapists.js");

//set up the routers
app.use("/services", servicesRouter);
app.use("/therapists", therapistsRouter);
app.use("/reviews", reviewsRouter);
