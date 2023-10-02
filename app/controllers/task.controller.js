const db = require("../models");
const Task = db.task;
const Category = db.category;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log(req.params.userId);
  if (!req.body.title || !req.params.userId) {
    res.status(400).send({
      message: "Empty content"
    });
    return;
  }

  const task = {
    title: req.body.title,
    description: req.body.description || '',
    completed: req.body.completed || false,
    userId: req.params.userId,
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

exports.userTask = (req, res) => {
  const userId = req.params.userId;
  var condition = userId ? { userId: userId } : null;

  Task.findAll({ 
    where: condition,
    include: [
      { model: Category, as: 'category' }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error: Load taks fail"
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.taskId;

  Task.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task updated succesfully"
        });
      } else {
        res.send({
          message: `Error to update task with id: =${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error to update task with id: =${id}.`
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.taskId;

  Task.destroy({where: { id: id }})
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task removed succesfully"
        });
      } else {
        res.send({
          message: `Error to remove task with id: =${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error to remove task with id: =${id}.`
      });
    });
};