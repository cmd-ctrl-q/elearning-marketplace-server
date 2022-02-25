import express from 'express';
const router = express.Router();

// middleware
import { requireSignin } from '../middlewares';

const { Register, Login, Logout, CurrentUser } = require('../controllers/auth');

router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);
router.get('/current-user', requireSignin, CurrentUser);

module.exports = router;
