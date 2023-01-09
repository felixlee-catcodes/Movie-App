const conn = require("./conn");
const User = require("./User");
const List = require("./List");
// const Product = require('./Product');
// const Order = require('./Order');
// const LineItem  = require('./LineItem');
const fs = require("fs");
const path = require("path");

List.belongsTo(User);
User.hasMany(List);
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
  const [moe, lucy, larry, felix] = await Promise.all([
    User.create({ username: "moe", password: "123", avatar }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    User.create({ username: "felix", password: "123", avatar }),
  ]);
  const [comedy, horror, scifi] = await Promise.all([
    List.create({ name: "Fave Comedies", userId: felix.id }),
    List.create({ name: "Fave Horror", userId: felix.id }),
    List.create({ name: "Fave Scifi", userId: felix.id }),
  ]);
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
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
};
