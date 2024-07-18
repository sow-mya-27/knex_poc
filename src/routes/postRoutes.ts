import express from 'express';
import upload from '../middlewares/upload';
import {
  createPostController,
  getPostController,
  updatePostController,
  deletePostController
} from '../controllers/postController';
import validateInput from '../middlewares/validateInput';
import { postSchema } from '../schemas/postSchema';

const router = express.Router();

router.post('/posts', upload.single('attachment'), validateInput(postSchema), createPostController);
router.get('/posts/:id', getPostController);
router.put('/posts/:id', upload.single('attachment'), validateInput(postSchema), updatePostController);
router.delete('/posts/:id', deletePostController);

export default router;
