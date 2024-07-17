import express from 'express';
import {
  createCommentController,
  getCommentController,
  updateCommentController,
  deleteCommentController
} from '../controllers/commentController';
import validateInput from '../middlewares/validateInput';
import { commentSchema } from '../schemas/commentSchema';

const router = express.Router();

router.post('/comments', validateInput(commentSchema), createCommentController);
router.get('/comments/:id', getCommentController);
router.put('/comments/:id', validateInput(commentSchema), updateCommentController);
router.delete('/comments/:id', deleteCommentController);

export default router;
