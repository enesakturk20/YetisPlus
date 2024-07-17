const express = require('express');
const router = express.Router();
const carrierController = require('../controllers/carrierController');

// Get all carriers
router.get('/', carrierController.getCarriers);

// Get a specific carrier by ID
router.get('/:id', carrierController.getCarrierById);

// Create a new carrier
router.post('/', carrierController.createCarrier);

// Update an existing carrier
router.put('/:id', carrierController.updateCarrier);

// Delete a carrier
router.delete('/:id', carrierController.deleteCarrier);

// Aktiflik durumunu güncelleyen route
router.post('/activeStatus', carrierController.toggleActiveStatus);

module.exports = router;
