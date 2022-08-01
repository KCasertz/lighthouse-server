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
// const servicesRouter = require("./routes/services.js");

//temporary testing db
app.get("/add-service", (req, res) => {
  const service = new Service({
    name: "GP via Babylon",
    summary:
      "GP online will listen to you and support you to find the best way forward",
    ratings: [4, 2, 3, 2, 1, 1, 4, 5, 4],
    description:
      "Through the Babylon app, you can access a GP within 24hrs over the phone and get support. The GP will listen to you and provide you with options such as medication, referral to the psychiatric teams for diagnosis and support, referral to therapy services and support with other things that may be impacting your mental health such as financial support or housing support ",
    waitingTimeMonths: 0,
    lgbtq: true,
    accessible: true,
    email: "",
    phone: "",
    website: "https://www.nhs.uk/service-search/find-a-gp/",
    location: {
      long: "",
      lat: "",
    },
    ftf: true,
    calls: true,
    videoCalls: true,
    group: false,
    individual: true,
    availability: {
      MonAM: true,
      MonPM: true,
      MonEve: true,
      TueEve: true,
      TueAM: true,
      TuePM: true,
      WedEve: true,
      WedAM: true,
      WedPM: true,
      ThuEve: true,
      ThuAM: true,
      ThuPM: true,
      FriEve: true,
      FriAM: true,
      FriPM: true,
      SatEve: true,
      SatAM: true,
      SatPM: true,
      SunEve: true,
      SunAM: true,
      SunPM: true,
    },
    bookDirect: true,
    bookingLink: "https://www.babylonhealth.com/en-gb/download-app",
    imageUrl:
      "https://www.babylonhealth.com/assets/images/header/babylon-health-logo.png",
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

//temporary testing db
app.get("/add-therapist", (req, res) => {
  const therapist = new Therapist({
    name: "Carly Jae",
    summary:
      "I provide psychodynamic therapy for people who have experienced trauma",
    ratings: [4, 2, 3, 2, 1, 1, 4, 5, 4],
    description:
      "I have over twenty years of experience providing psychodynamic therapy for people who have experienced trauma. My sessions usually take place in person and last 60minutes each, weekly. I offer a sliding scale for payments",
    waitingTimeMonths: 0,
    lgbtq: true,
    accessible: false,
    email: "carlyjaetherapy@therapy.co.uk",
    phone: "07735273645",
    website: "http://carlyjaetherapy.co.uk",
    location: {
      long: "-0.16909",
      lat: "51.42737",
    },
    ftf: true,
    calls: false,
    videoCalls: false,
    group: false,
    individual: true,
    availability: {
      MonAM: true,
      MonPM: true,
      MonEve: false,
      TueEve: false,
      TueAM: true,
      TuePM: true,
      WedEve: false,
      WedAM: true,
      WedPM: true,
      ThuEve: true,
      ThuAM: true,
      ThuPM: true,
      FriEve: false,
      FriAM: false,
      FriPM: false,
      SatEve: false,
      SatAM: true,
      SatPM: true,
      SunEve: false,
      SunAM: false,
      SunPM: false,
    },
    bookDirect: true,
    bookingLink: "http://carlyjaetherapy.co.uk",
    imageUrl:
      "https://photos.psychologytoday.com/62658b6d-a6a7-461d-bcd9-05b583e0e255/2/320x400.jpeg",
    slidingScale: true,
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

app.get("/add-review", (req, res) => {
  const review = new Review({
    name: "Aniqua Anderson",
    review:
      "I am so disappointed with this service. My therapist lacked empathy and I felt like they were just watching the clock the whoel time instead of listening to me. I feel worse than ever",
    rating: 1,
    serviceId: "62e82097c67bcfb01173987a",
    dateReferred: 2021 - 07 - 24,
    dateAccessed: 2022 - 09 - 12,
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
//set up the routers
// app.use("/services", servicesRouter);
