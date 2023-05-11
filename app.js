//01.import express
const express = require("express");
const APIRouters = require("./Routes/API_Routes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");

//02.create instance
const app = express();
const PORT = 5000;

app.use(cors());

// to enable or access post data (body-parser):
app.use(express.json()); //string JSON data => pure json data
app.use(express.urlencoded({ extended: false })); //normal post data to json data

//03.routing
app.use("/", APIRouters);

dotenv.config(); //for env method

//mongosse connecting:
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MongoDB "))
  .catch((error) => console.log("mongoDB connection failed", error));

//multer storage: (cb=>callback function which is take care or our arraws)
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "Images");
  },
  filename: (request, file, cb) => {
    cb(null, request.body.name);
  },
});

//multer upload:
const upload = multer({ storage: storage });
app.post("api/uppload", upload.single("file"), (request, response) => {
  response.status(200).send({
    status: true,
    message: "File has been uploaded...",
  });
});

//04.add listener
app.listen(PORT, (req, res) => {
  try {
    console.log("Backend is runnin on port", PORT);
  } catch (error) {
    error
  }
});
