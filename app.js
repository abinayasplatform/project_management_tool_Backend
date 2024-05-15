const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./db/db");
const router = require("./routes/router");
const taskRoutes = require("./routes/taskRotues");
const projectRoutes = require("./routes/projectRoutes");
const memberRoutes = require("./routes/memberRoutes");
require("dotenv").config();

const app = express();
const port = 3000;
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to the Project Management Tool Server! 🌐");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", router);
app.use("/tasks", taskRoutes);
app.use("/project", projectRoutes);
app.use("/member", memberRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
