const Carrier = require('../models/Carrier');

// Get all carriers
const getCarriers = async (req, res) => {
    try {
        const carriers = await Carrier.find();
        res.json(carriers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific carrier by ID
const getCarrierById = async (req, res) => {
    try {
        const carrier = await Carrier.findById(req.params.id);
        if (carrier) {
            res.json(carrier);
        } else {
            res.status(404).json({ message: 'Carrier not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new carrier
const createCarrier = async (req, res) => {
    const carrier = new Carrier(req.body);
    try {
        const newCarrier = await carrier.save();
        res.status(201).json(newCarrier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing carrier
const updateCarrier = async (req, res) => {
    try {
        const carrier = await Carrier.findById(req.params.id);
        if (carrier) {
            Object.assign(carrier, req.body);
            const updatedCarrier = await carrier.save();
            res.json(updatedCarrier);
        } else {
            res.status(404).json({ message: 'Carrier not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a carrier
const deleteCarrier = async (req, res) => {
    try {
        const carrier = await Carrier.findById(req.params.id);
        if (carrier) {
            await carrier.remove();
            res.json({ message: 'Carrier deleted' });
        } else {
            res.status(404).json({ message: 'Carrier not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const toggleActiveStatus = async (req, res) => {
    const { userId, isActive } = req.body;

    if (!userId || typeof isActive !== 'boolean') {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        // Tekil Carrier'ı `findById` veya `findOne` ile bulun
        const carrier = await Carrier.findOne({ userId: userId });

        if (!carrier) {
            return res.status(404).json({ message: 'Carrier not found' });
        }

        // Aktiflik durumunu güncelleyin
        carrier.isActive = isActive;
        console.log('Updated Carrier:', carrier);

        // `save` fonksiyonunu çağırın
        await carrier.save();

        res.status(200).json({ message: 'Carrier status updated successfully', carrier });
    } catch (error) {
        console.error('Error updating carrier status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getCarriers,
    getCarrierById,
    createCarrier,
    updateCarrier,
    deleteCarrier,
    toggleActiveStatus,
};
