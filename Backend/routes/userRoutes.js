const express = require('express');
const { login, register, getAllUsers, updateUserRole } = require('../controllers/userController');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/users', getAllUsers);
router.put('/users/role', updateUserRole);

module.exports = router;
