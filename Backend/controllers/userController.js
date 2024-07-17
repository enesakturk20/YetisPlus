const User = require('../models/User');
const Carrier = require('../models/Carrier');

const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(201).json({ user: user.toObject({ getters: true }) });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }); // Admin hariç tüm kullanıcıları getirin
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserRole = async (req, res) => {
    const { userId, newRole } = req.body;
    try {
        const user = await User.findById(userId);
        if (user) {
            const oldRole = user.role;
            user.role = newRole;
            await user.save();

            // Kullanıcının rolü "carrier" yapılırsa, Carrier modeline ekleyin
            if (newRole === 'carrier' && oldRole !== 'carrier') {
                const carrier = new Carrier({
                    name: user.username,
                    userId: user._id,
                    location: { lat: 40.9876429, lng: 28.9544895 }, // Varsayılan değerler, gerekirse değiştirin
                });
                await carrier.save();
            }

            // Kullanıcının rolü "carrier" dan başka bir role geçerse, Carrier modelinden çıkarın
            if (oldRole === 'carrier' && newRole !== 'carrier') {
                await Carrier.findOneAndDelete({ userId: user._id });
            }

            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { login, register, getAllUsers, updateUserRole};
