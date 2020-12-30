const express = require("express");

const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();

// config setups
dotenv.config({ path: "./config/.env" });
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// general purpose middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// @desc     landing page
// @route    GET /
app.get("/", (req, res) => {
  console.log(process.env.DATABASE_URL);
  res.json({ info: "Node.js, Express, and Postgres API" });
});

// route all calls to /api here
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
