require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 9999;
const { Server } = require("socket.io");
const SOCKET_PORT = process.env.SOCKET_PORT || 3339;
const FRONTEND_PORT = process.env.FRONTEND_PORT;

app.use(cors());
app.use(express.json());

const dbURI = `mongodb+srv://katiecaserta:Lighthouse333@lighthouse1.h4zhazg.mongodb.net/LighthouseDB?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //listen to port, only once connected successfully to DB
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => console.log(err));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://localhost:${FRONTEND_PORT}`,
    methods: ["GET", "POST"],
  },
});

server.listen(SOCKET_PORT, () => {
  console.log(`socket io server up and running on port ${SOCKET_PORT}`);
});

io.on("connection", (socket) => {
  console.log("SOCKET WORKING:", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    socket.to(data.room).emit("receive_name", data);
    console.log(`user with ID ${socket.id} joined room ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

const servicesRouter = require("./routes/services.js");
const reviewsRouter = require("./routes/reviews.js");
const therapistsRouter = require("./routes/therapists.js");

app.use("/services", servicesRouter);
app.use("/therapists", therapistsRouter);
app.use("/reviews", reviewsRouter);
