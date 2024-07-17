import express from 'express';
import {
  createPostController,
  getPostController,
  updatePostController,
  deletePostController
} from '../controllers/postController';
import validateInput from '../middlewares/validateInput';
import { postSchema } from '../schemas/postSchema';

const router = express.Router();

router.post('/posts', validateInput(postSchema), createPostController);
router.get('/posts/:id', getPostController);
router.put('/posts/:id', validateInput(postSchema), updatePostController);
router.delete('/posts/:id', deletePostController);

export default router;
