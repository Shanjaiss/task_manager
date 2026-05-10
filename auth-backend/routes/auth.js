import express from 'express';
import { Register, Login } from '../controllers/authController.js';
import {
  CreateTodo,
  GetTodos,
  UpdateTodoStatus,
} from '../controllers/createTodo.js';

const router = express.Router();

router.post('/register', Register);
router.post('/auth/login', Login);
router.get('/todos', GetTodos);
router.post('/createtodo', CreateTodo);
router.put('/todos/:id', UpdateTodoStatus);

export default router;
