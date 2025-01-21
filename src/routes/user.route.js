//importing the required modules
import express from 'express';
const router = express.Router();

//import the controller
import { signup, login } from '../controllers/auth.controller.js';

router.post("/login", login);
router.post("/signup", signup);


export default router;