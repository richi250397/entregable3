const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

const User = db.user;
const Task = db.task;
const Category = db.category;

User.hasMany(Task, { foreignKey: "userId", as: "tasks" });
Task.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

Category.hasMany(Task, { foreignKey: "categoryId", as: "tasks" });
Task.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category"
});



db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
  res.json({ message: "Running Aplication" });
});

require("./app/routes/api.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
