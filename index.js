const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const server = http.createServer(app);

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const chatRoute = require("./routes/chat");
const messageRoute = require("./routes/message");

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
app.use("/chat", chatRoute);
app.use("/message", messageRoute);

//socket io
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được.

socketIo.on("connection", (socket) => {
  ///Handle khi có connect từ client tới
  console.log("New client connected " + socket.id);

  socket.on("sendDataClient", function (data) {
    console.log("data");
    // Handle khi có sự kiện tên là sendDataClient từ phía client
    socketIo.emit("sendDataServer", { data }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

server.listen(process.env.PORT || port, () => {
  console.log("Server is running... at port " + port);
});
