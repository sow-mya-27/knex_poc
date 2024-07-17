import db from '../config/database';

interface Comment {
  id?: number;
  post_id: number;
  user_id: number;
  comment: string;
}

async function createComment(data: Comment): Promise<Comment[]> {
  return db('comments').insert(data).returning('*');
}

async function getComment(id: number): Promise<Comment> {
  return db('comments').where({ id }).first();
}

async function updateComment(id: number, data: Partial<Comment>): Promise<Comment[]> {
  return db('comments').where({ id }).update(data).returning('*');
}

async function deleteComment(id: number): Promise<number> {
  return db('comments').where({ id }).del();
}

export {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  Comment
};
