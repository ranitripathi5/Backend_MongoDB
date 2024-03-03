import express from 'express';
import { getAllUser, signup } from '../controllers/user.cotroller';
import { login } from '../controllers/user.cotroller';
const  router = express.Router();
router.get("/",getAllUser);
router.post("/signup",signup);
router.post("/login", login);
export default router;