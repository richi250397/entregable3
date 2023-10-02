const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({
            message: "Empty content"
        });
        return;
    }

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error: Cannot create user"
            });
        });
};