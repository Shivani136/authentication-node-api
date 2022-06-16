import express from "express";

const router = express.Router();
import UserController from '../controllers/UserController.js';

//public route
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)


//private route
router.post('/changepassword', UserController.changeUserPassword) 

export default router