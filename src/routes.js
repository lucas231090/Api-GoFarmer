const { Router } = require('express');

const CategoryController = require('./app/controllers/CategoryController');
const FarmController = require('./app/controllers/FarmController');

const router = Router();

// farms
router.get('/farms', FarmController.index);
router.get('/farms/:id', FarmController.show);
router.post('/farms', FarmController.store);
router.delete('/farms/:id', FarmController.delete);
router.put('/farms/:id', FarmController.update);

// categories
router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.post('/categories', CategoryController.store);
router.delete('/categories/:id', CategoryController.delete);
router.put('/categories/:id', CategoryController.update);

module.exports = router;
