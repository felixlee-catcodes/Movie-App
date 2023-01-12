const conn = require("./conn");
const User = require("./User");
const List = require("./List");
const Movie = require("./Movie");
// const Product = require('./Product');
// const Order = require('./Order');
// const LineItem  = require('./LineItem');
const fs = require("fs");
const path = require("path");

List.belongsTo(User);
User.hasMany(List);
Movie.belongsTo(List);
List.hasMany(Movie);
// LineItem.belongsTo(Order);
// Order.hasMany(LineItem);
// LineItem.belongsTo(Product);

const getImage = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "base64", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const avatar = await getImage(path.join(__dirname, "../../prof-avatar.png"));

  // USERS
  const [moe, lucy, larry, felix] = await Promise.all([
    User.create({ username: "moe", password: "123", avatar }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    User.create({ username: "felix", password: "123", avatar }),
  ]);

  // LISTS
  const [comedy, horror, scifi, romCom] = await Promise.all([
    List.create({
      name: "Fave Comedies",
      userId: felix.id,
      // movieId: theMask.id,
      // movieId: ratRace.id,
    }),
    List.create({
      name: "Fave Horror",
      userId: felix.id,
      // movieId: theThing.id,
    }),
    List.create({ name: "Fave Scifi", userId: felix.id }),
    List.create({ name: "Best Rom Coms", userId: moe.id }),
  ]);

  // MOVIES
  const [theMask, theThing, ratRace] = await Promise.all([
    Movie.create({ title: "The Mask", listId: comedy.id, listId: romCom.id }),
    Movie.create({ title: "The Thing", listId: horror.id }),
    Movie.create({ title: "Rat Race", listId: comedy.id }),
  ]);

  console.log(theMask);

  return {
    users: {
      moe,
      lucy,
      larry,
      felix,
    },
    lists: {
      comedy,
      horror,
      scifi,
      romCom,
    },
    movies: {
      theMask,
      theThing,
      ratRace,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  List,
  Movie,
};
