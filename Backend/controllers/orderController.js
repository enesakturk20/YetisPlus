const Order = require('../models/Order');
const { io } = require('../server');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('assignedCarrier');
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        //io.emit('newOrder', order); // `io`'yu kullanarak yeni siparişi yayını yapıyoruz
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const assignCarrier = async (req, res) => {
    console.log(io);
    try {
        const { orderId, carrierId } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.assignedCarrier = carrierId;
        await order.save();
        const updatedOrder = await Order.findById(orderId).populate('assignedCarrier');
        //io.emit('orderAssigned', updatedOrder); // `io`'yu kullanarak güncellenmiş siparişi yayını yapıyoruz
        res.json(updatedOrder);
    } catch (error) {
        console.error('Error assigning carrier:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getOrders, createOrder, assignCarrier };
