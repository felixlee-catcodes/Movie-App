const conn = require("./conn");
const { STRING, TEXT, UUID, UUIDV4 } = conn.Sequelize;

const Movie = conn.define("movie", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  listId: {
    type: UUID,
  },
});

module.exports = Movie;
