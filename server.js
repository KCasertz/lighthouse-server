require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//link in the router files
const servicesRouter = require("./routes/services.js");

//set up the routers
app.use("/services", servicesRouter);

//listen to port
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
