require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3333;
const { Server } = require("socket.io");

//middleware
app.use(cors());
app.use(express.json());

//connect to MongoDB and set up server
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

//create socket's server
const server = http.createServer(app);

//connect the sociekt io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(3333, () => {
  console.log("socket io server UP AND RUNNIN BEBEH");
});

//first check if someone connected to socket.io server (connection event)
io.on("connection", (socket) => {
  console.log("SOCKET WORKING:", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with ID ${socket.id} joined room ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

//link in the router files
const servicesRouter = require("./routes/services.js");
const reviewsRouter = require("./routes/reviews.js");
const therapistsRouter = require("./routes/therapists.js");

//set up the routers
app.use("/services", servicesRouter);
app.use("/therapists", therapistsRouter);
app.use("/reviews", reviewsRouter);
