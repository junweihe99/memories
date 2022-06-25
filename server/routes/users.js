//Create routes for backend components
import express from 'express';
//Import post requests
import { signin, signup } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);



export default router;