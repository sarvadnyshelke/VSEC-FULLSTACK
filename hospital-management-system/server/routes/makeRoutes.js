const express = require('express');
const makeController = require('../controllers/crudController');

// Builds the 5 REST routes for a model
module.exports = (Model, label) => {
  const c = makeController(Model, label);
  const router = express.Router();
  router.route('/').get(c.getAll).post(c.create);
  router.route('/:id').get(c.getOne).put(c.update).delete(c.remove);
  return router;
};
