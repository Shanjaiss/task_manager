import express from 'express';
import { Register, Login } from '../controllers/authController.js';
import { CreateTodo } from '../controllers/createTodo.js';

const router = express.Router();

router.post('/register', Register);
router.post('/auth/login', Login);
router.post('/createtodo', CreateTodo);

export default router;
