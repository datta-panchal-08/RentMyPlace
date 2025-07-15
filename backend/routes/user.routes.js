import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { getCurrentUser } from '../controllers/user.controller.js';
const router = express.Router();

router.get("/current",isAuthenticated,getCurrentUser);

export default router;  