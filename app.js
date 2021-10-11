const express = require("express");

const app = express();

const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

// app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Controll-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/feed", feedRoutes);

mongoose
  .connect(
    "mongodb+srv://Reza:8raR7csPXj1RF3xv@cluster0.7dpjn.mongodb.net/test?authSource=admin&replicaSet=atlas-41r5pq-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
  )
  .then((res) => app.listen(8080))
  .catch((err) => console.log(err));
