const express = require("express");

const path = require("path");

const app = express();

const mongoose = require("mongoose");

const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/images");
  },
  fileName: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.orginalName);
  },
});
const feedRoutes = require("./routes/feed");

app.use(express.urlencoded({ extended: true }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Controll-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    "mongodb+srv://Reza:8raR7csPXj1RF3xv@cluster0.7dpjn.mongodb.net/test?authSource=admin&replicaSet=atlas-41r5pq-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
  )
  .then((res) => app.listen(8080))
  .catch((err) => console.log(err));
