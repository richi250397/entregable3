const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Empty content"
        });
        return;
    }

    const category = {
        name: req.body.name,
        description: req.body.description || '',
    };

    Category.create(category)
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