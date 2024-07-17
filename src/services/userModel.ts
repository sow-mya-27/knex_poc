import db from "../config/database";
import { Post } from "./postModel";

interface User {
  id?: number;
  name: string;
  email: string;
}

interface UserPosts {
  id?: number;
  name: string;
  email: string;
  posts?: Post;
}

async function createUser(data: User): Promise<User[]> {
  return db("users").insert(data).returning("*");
}

async function getUser(id: number): Promise<User> {
  return db("users").where({ id }).first();
  // return db.column('name', { by: 'email' }, 'id').select().from('users');

}

async function getUserPosts(id: number): Promise<any> {
  return db('users')
  .join('posts', 'users.id', 'posts.user_id')
  .where({ 'posts.user_id': id })
  .select('posts.*','users.*');
  
}

async function updateUser(id: number, data: Partial<User>): Promise<User[]> {
  return db("users").where({ id }).update(data).returning("*");
}

async function deleteUser(id: number): Promise<number> {
  return db("users").where({ id }).del();
}

export { createUser, getUser, updateUser, deleteUser, User,getUserPosts };
