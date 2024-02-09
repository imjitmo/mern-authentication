import express from 'express';

//Controller Import
import { google, signin, signup } from '../controllers/auth.Controller.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/google', google);

export default router;
