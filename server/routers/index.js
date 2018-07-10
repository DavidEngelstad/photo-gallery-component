const router = require('express').Router();
const { imageController } = require('../controllers/imageController.js');

router.get('/products/images', imageController.get);
router.post('/products/images', imageController.post);
router.put('/products/images', imageController.update);
router.delete('/products/images', imageController.delete);

module.exports = {
  router: router
}