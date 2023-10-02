module.exports = (app) => {
  const user = require('../controllers/user.controller');
  const task = require('../controllers/task.controller');
  const category = require('../controllers/category.controller');

  app.post('/api/user', user.create);

  app.post('/api/user/:userId/tareas', task.create);

  app.post('/api/category', category.create);
};
