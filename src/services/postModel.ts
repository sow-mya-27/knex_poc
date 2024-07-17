import db from '../config/database';

interface Post {
  id?: number;
  user_id: number;
  title: string;
  body: string;
}

async function createPost(data: Post): Promise<Post[]> {
  return db('posts').insert(data).returning('*');
}

async function getPost(id: number): Promise<Post> {
  return db('posts').where({ id }).first();
}

async function updatePost(id: number, data: Partial<Post>): Promise<Post[]> {
  return db('posts').where({ id }).update(data).returning('*');
}

async function deletePost(id: number): Promise<number> {
  return db('posts').where({ id }).del();
}

export {
  createPost,
  getPost,
  updatePost,
  deletePost,
  Post
};
