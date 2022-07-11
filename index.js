const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

const port = 8000;
dotenv.config();
const strConnection =
  "mongodb+srv://duyphong1504:Duyphong1504@cluster0.svap3.mongodb.net/?retryWrites=true&w=majority";

//connect database
mongoose.connect(strConnection, () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.get("/api", (req, res) => {
  res.status(200).json("Hello");
});

//routes
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/post", postRoute);

app.listen(process.env.PORT || port, () => {
  console.log("Server is running...");
});
