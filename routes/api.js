const express = require("express");
const app = express();
// Require router files

const usersRoutes = require("./api/users");
const recipesRoutes = require("./api/recipes");
const favoritesRoutes = require("./api/favorites");
// Include the routes to express
app.use("/users", usersRoutes);
app.use("/recipes", recipesRoutes);
app.use("/favorites", favoritesRoutes);
// Export the file to be used in server.js
module.exports = app;
