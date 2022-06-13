const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const app = express();
const path = require("path");
const cors = require("cors");
let bodyParser = require("body-parser");
// routes
const authRoutes = require("./routes/auth");
const provinceRoutes = require("./routes/province");
const patientRoutes = require("./routes/patient");
const surgeryRoutes = require("./routes/surgery");
const postSurgeryRoutes = require("./routes/postSurgery");
const sectorRoutes = require("./routes/sector");
const programtypeRoutes = require("./routes/programtype");
const rebateRoutes = require("./routes/rebate");

// environment variables
env.config();

// mongodb connection
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection is established");
  }
);

// greeting route
app.get("/", (req, res) => {
  res.send("Backend APIs working...!!!");
});

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/account", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/surgery", surgeryRoutes);
app.use("/api/postSurgery", postSurgeryRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

//backend// 6LewlvocAAAAAIgCOYW_MjZHvYWw9_9DTKcDg-bY
