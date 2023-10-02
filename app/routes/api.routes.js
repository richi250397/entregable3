module.exports = (app) => {
  const user = require('../controllers/user.controller');
  const task = require('../controllers/task.controller');
  const category = require('../controllers/category.controller');

  app.post('/api/user', user.create);

  app.post('/api/user/:userId/task', task.create);
  app.get('/api/task/user/:userId', task.userTask);
  app.put('/api/task/:taskId', task.update);
  app.delete('/api/task/:taskId', task.delete);

  app.post('/api/category', category.create);
};
