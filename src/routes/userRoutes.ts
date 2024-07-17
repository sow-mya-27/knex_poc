import express from 'express';
import {
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController,
  getUserPostsController
} from '../controllers/userController';
import validateInput from '../middlewares/validateInput';
import { userSchema } from '../schemas/userSchema';

const router = express.Router();

router.post('/users', validateInput(userSchema), createUserController);
router.get('/users/:id', getUserController);
router.get('/userposts/:id', getUserPostsController);
router.put('/users/:id', validateInput(userSchema), updateUserController);
router.delete('/users/:id', deleteUserController);

export default router;
