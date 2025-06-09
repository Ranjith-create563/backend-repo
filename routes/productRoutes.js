const express = require('express');
const router = express.Router();
const { getFilteredProducts } = require('../Controllers/productController');

router.get('/', getFilteredProducts);

module.exports = router;