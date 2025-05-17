const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// ✅ More specific routes should always come first
router.post('/search', productController.searchProducts);
router.post('/create', productController.createProduct);
router.get('/category/:categoryName', productController.getProductsByCategory);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductsById);

module.exports = router;
