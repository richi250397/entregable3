const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.username || !req.params) {
    res.status(400).send({
      message: "Empty content"
    });
    return;
  }

  const task = {
    title: req.body.title,
    description: req.body.description || '',
    completed: req.body.completed || false,
    userId: req.params,
    categoryId: req.body.category
  };

  Task.create(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error: Cannot create task"
      });
    });
};