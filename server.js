require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3333;
const Service = require("./models/service.js");

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
// const servicesRouter = require("./routes/services.js");

//temporary testing db
app.get("/add-service", (req, res) => {
  const service = new Service({
    name: "Mind",
    description:
      "A range of mental health services including IAPT, floating support, and group activities",
    ratings: [5, 4, 5, 3, 2, 5, 6],
    summary:
      "Providing a range of mental health services in the borough of Brent, Wandsworth and Westminster - including floating support where we support you at your home, group activities such as arts and crafts and cookery sessions, and IAPT services such as CBT and counselling in both group and individual settings",
    waitingTimeMonths: 3,
    lgbtq: true,
    accessible: true,
  });

  service
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//set up the routers
// app.use("/services", servicesRouter);
