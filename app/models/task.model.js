module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Task;
};
