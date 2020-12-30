const express = require("express");
const Router = require("express-promise-router");
const db = require("../../config/db");

const router = new Router();

router.get("/parameters", async (req, res) => {
  console.log("am here");
  const categoryData = await db.query(
    "SELECT DISTINCT categories FROM recipes",
    []
  );

  const durationData = await db.query(
    "SELECT DISTINCT duration FROM recipes",
    []
  );

  const categoryRows = await categoryData.rows;
  const durationRows = await durationData.rows;

  const rows = { categoryRows, durationRows };
  console.log(rows);

  res.status(200).json(rows);
});

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM recipes ORDER BY ID ASC", []);
  res.status(200).json(rows);
});

router.post("/", async (req, res) => {
  const {
    title,
    ingredients,
    directions,
    duration,
    categories,
    userid,
  } = req.body;

  console.log({ title, ingredients, directions, duration, categories, userid });

  const success = await db.query(
    "INSERT into recipes (title, ingredients, directions, duration, categories, userid) VALUES ($1, $2, $3, $4, $5, $6)",
    [title, ingredients, directions, duration, categories, userid]
  );
  if (success)
    res.status(201).json({ status: "success", message: "Recipe added." });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    rows,
  } = await db.query("SELECT * FROM recipes WHERE ID = $1 ORDER BY ID ASC", [
    id,
  ]);
  res.status(200).json(rows);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, directions, categories } = req.body;

  await db.query(
    "UPDATE recipes SET title=$1, ingredients=$2, directions=$3, categories=$4 WHERE id=$5",
    [title, ingredients, directions, categories, id]
  );

  res.status(201).json({ status: "success", message: "Recipe updated." });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM recipes WHERE ID = $1", [id]);
  res.status(200).json({ status: "success", message: "Recipe deleted." });
});

router.get("/byuser/:id", async (req, res) => {
  const { id } = req.params;

  const {
    rows,
  } = await db.query(
    "SELECT * FROM recipes WHERE userid = $1 ORDER BY ID ASC",
    [id]
  );

  if (rows) {
    res.status(200).json(rows);
  }
});

router.post("/ids", async (req, res) => {
  console.log("im in the id");
  const queries = [];
  const { ids } = req.body;

  console.log("HELLOOOO");
  console.log({ ids });

  for await (const id of ids) {
    queries.push(
      await db.query("SELECT * FROM recipes WHERE ID = $1 ORDER BY ID ASC", [
        id,
      ])
    );
  }

  const results = await Promise.all(queries);
  const rows = results.map((result) => result.rows[0]);

  res.status(200).json(rows);
});

module.exports = router;
