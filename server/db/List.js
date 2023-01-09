const conn = require("./conn");
const { STRING, UUID, UUIDV4 } = conn.Sequelize;
//goal: seed a list into the db, create a route to send the list from the server
const List = conn.define("list", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
});

module.exports = List;
