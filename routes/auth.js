import express from 'express';
const router = express.Router();

const { Register, Login, Logout } = require('../controllers/auth');

router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);

module.exports = router;
