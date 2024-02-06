// routers/userRoutes.js
import express from 'express';
import { signup, login, getUserProfile, updateUserCart } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/profile', authMiddleware, getUserProfile);
router.post('/update-cart', authMiddleware, updateUserCart);

router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Protected endpoint', user: req.user });
});

export default router;
