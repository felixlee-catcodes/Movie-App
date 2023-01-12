const express = require("express");
const List = require("../db/List");
const { User } = require("../db");
const { Movie } = require("../db");
const app = express.Router();

module.exports = app;

//getting all of a user's lists
// app.get("/:username", async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       where: { username: req.params.username },
//     });
//     const lists = await List.findAll({
//       where: {
//         userId: user.id,
//       },
//       include: [User, Movie],
//     });
//     res.send(lists);
//   } catch (ex) {
//     next(ex);
//   }
// });

app.get("/", async (req, res, next) => {
  try {
    const user = await User.findAll({
      include: [{ model: List }],
    });
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

app.get("/all", async (req, res, next) => {
  try {
    const lists = await List.findAll({
      include: [{ model: Movie }],
    });
    res.send(lists);
  } catch (ex) {
    next(ex);
  }
});
