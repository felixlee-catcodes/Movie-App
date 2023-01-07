const conn = require("./conn");
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

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
});
