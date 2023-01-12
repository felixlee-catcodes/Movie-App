const conn = require("./conn");
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const ListItem = conn.define("listItem", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
  },
  listId: {
    type: UUID,
  },
  movieId: {
    type: UUID,
  },
});
