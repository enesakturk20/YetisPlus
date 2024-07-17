const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: {
    type: [String],
    required: true,
  },
  assignedCarrier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrier',
    default: null,
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in-progress', 'completed'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Order', orderSchema);
