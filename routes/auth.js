import express from 'express';
const router = express.Router();

const { Register, Login } = require('../controllers/auth');

router.post('/register', Register);
router.post('/login', Login);

module.exports = router;
