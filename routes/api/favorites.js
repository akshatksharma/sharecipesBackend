const express = require("express");
const app = express();
const router = express.Router();
const db = require("../../config/db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log({ id });

  const {
    rows,
  } = await db.query(
    "SELECT favorite_list FROM favorites WHERE user_id = $1 ORDER BY ID ASC",
    [id]
  );

  console.log(rows);

  res.status(200).json(rows);
});

router.post("/", async (req, res) => {
  const { userId, updatedFavs } = req.body;

  const formattedPosts = { favorites: updatedFavs };

  console.log(updatedFavs);

  console.log(formattedPosts);

  const success = await db.query(
    "INSERT INTO favorites(user_id, favorite_list) VALUES ($1, $2) ON CONFLICT ON CONSTRAINT unique_user_id DO UPDATE SET favorite_list = $3",
    [userId, formattedPosts, formattedPosts]
  );

  if (success) {
    res.status(201).json({ status: "success", message: "Favorite added." });
  } else {
    res.status(400).json({ status: "failure", message: "Favorite not added." });
  }
});

module.exports = router;
