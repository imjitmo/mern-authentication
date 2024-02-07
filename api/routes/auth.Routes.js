import express from 'express';

//Controller Import
import { signup } from '../controllers/auth.Controller.js';

const router = express.Router();

router.post('/signup', signup);

export default router;
