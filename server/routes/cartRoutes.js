const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');

router.use(auth);

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);

module.exports = router;