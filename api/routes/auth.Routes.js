import express from 'express';

//Controller Import
import { signin, signup } from '../controllers/auth.Controller.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

export default router;
