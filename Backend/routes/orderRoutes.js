const express = require('express');
const { getOrders, createOrder, assignCarrier } = require('../controllers/orderController');

const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.post('/assignCarrier', assignCarrier);

module.exports = router;
