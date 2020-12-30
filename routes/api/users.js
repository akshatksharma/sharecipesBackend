const express = require("express");
const app = express();
const router = express.Router();
const db = require("../../config/db");

router.get("/", async (req, res) => {

  const {rows} = await db.query("SELECT id from USERS")

  if (rows) {
    res.status(200).json(rows)
  }



});

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const {
    rows,
  } = await db.query("SELECT id FROM users WHERE email = $1 ORDER BY ID ASC", [
    email,
  ]);
  res.status(200).json(rows);
});

module.exports = router;
