import express from "express";

const router = express.Router();
import Upload from './Upload.js';
import UserController from '../controllers/UserController.js';
import ProductController from "../controllers/ProductController.js";
import CategoryController from "../controllers/CategoryController.js";
import checkUserAuth from '../middlewares/auth-middleware.js';

//route level middleware to auth route
router.use('./changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)

//public route
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.post('/set-reset-password-email',UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token',UserController.userPasswordReset)
router.post('/create',ProductController.userCreate)
router.get('/user-list',ProductController.userList)
router.delete('/delete',ProductController.userDelete)
router.put('/update',ProductController.userUpdate)
router.get('/user-detail',ProductController.userDetail)
router.get('/search/:key',ProductController.Search)
router.post('/upload' , Upload)
router.post('/addCategory', CategoryController.addCategory)


//private route
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggeduser', UserController.loggedUser)

export default router