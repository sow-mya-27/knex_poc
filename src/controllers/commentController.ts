import { Request, Response, NextFunction } from 'express';
import {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  Comment
} from '../services/commentModel';

async function createCommentController(req: Request, res: Response, next: NextFunction) {
  try {
    const comment = await createComment(req.body as Comment);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

async function getCommentController(req: Request, res: Response, next: NextFunction) {
  try {
    const comment = await getComment(parseInt(req.params.id, 10));
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    next(error);
  }
}

async function updateCommentController(req: Request, res: Response, next: NextFunction) {
  try {
    const comment = await updateComment(parseInt(req.params.id, 10), req.body as Partial<Comment>);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    next(error);
  }
}

async function deleteCommentController(req: Request, res: Response, next: NextFunction) {
  try {
    const rowsDeleted = await deleteComment(parseInt(req.params.id, 10));
    if (!rowsDeleted) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export {
  createCommentController,
  getCommentController,
  updateCommentController,
  deleteCommentController
};
