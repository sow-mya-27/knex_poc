import { Request, Response, NextFunction } from 'express';
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  Post
} from '../services/postModel';

async function createPostController(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await createPost(req.body as Post);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
}

async function getPostController(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await getPost(parseInt(req.params.id, 10));
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
}

async function updatePostController(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await updatePost(parseInt(req.params.id, 10), req.body as Partial<Post>);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
}

async function deletePostController(req: Request, res: Response, next: NextFunction) {
  try {
    const rowsDeleted = await deletePost(parseInt(req.params.id, 10));
    if (!rowsDeleted) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export {
  createPostController,
  getPostController,
  updatePostController,
  deletePostController
};
