import { Request, Response, NextFunction } from 'express';
import { createUserController, getUserController, updateUserController, deleteUserController, getUserPostsController } from '../../controllers/userController';
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserPosts
} from '../../services/userModel';
import { mockRequest, mockResponse, mockNext } from './commentController.test';

jest.mock('../../services/userModel');

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    const req = mockRequest({ name: 'John Doe', email: 'john@example.com' });
    const res = mockResponse();
    const next = mockNext();
    
    (createUser as jest.Mock).mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' });
    
    await createUserController(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  it('should handle error during user creation', async () => {
    const req = mockRequest({ content: 'This is a comment', postId: 1 });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (createUser as jest.Mock).mockRejectedValue(error);

    await createUserController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  it('should handle error during user get by id', async () => {
    const req = mockRequest({ content: 'This is a comment', postId: 1 });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (getUser as jest.Mock).mockRejectedValue(error);

    await getUserController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  it('should handle error during user get posts', async () => {
    const req = mockRequest({ content: 'This is a comment', postId: 1 });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (getUserPosts as jest.Mock).mockRejectedValue(error);

    await getUserPostsController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  it('should handle error during user updation', async () => {
    const req = mockRequest({ content: 'This is a comment', postId: 1 });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (updateUser as jest.Mock).mockRejectedValue(error);

    await updateUserController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  it('should handle error during user deletion', async () => {
    const req = mockRequest({ content: 'This is a comment', postId: 1 });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (deleteUser as jest.Mock).mockRejectedValue(error);

    await deleteUserController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it('should get a user by id', async () => {
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (getUser as jest.Mock).mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' });

    await getUserController(req, res, next);

    expect(res.status).not.toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  it('should return 404 if user not found', async () => {
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (getUser as jest.Mock).mockResolvedValue(null);

    await getUserController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('should update a user', async () => {
    const req = mockRequest({ name: 'John Doe', email: 'john@example.com' }, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (updateUser as jest.Mock).mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' });

    await updateUserController(req, res, next);

    expect(res.status).not.toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  it('should return 404 if user not found in update', async () => {
    const req = mockRequest({ name: 'John Doe', email: 'john@example.com' }, { id: '100' });
    const res = mockResponse();
    const next = mockNext();

    (updateUser as jest.Mock).mockResolvedValue(null);

    await updateUserController(req, res, next);    

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('should delete a user', async () => {
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (deleteUser as jest.Mock).mockResolvedValue(1);

    await deleteUserController(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  it('should return 404 if user not found in delete', async () => {
    const req = mockRequest({}, { id: '100' });
    const res = mockResponse();
    const next = mockNext();

    (deleteUser as jest.Mock).mockResolvedValue(null);

    await deleteUserController(req, res, next);    

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('should get user posts by user id', async () => {
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (getUserPosts as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Post 1', content: 'Content 1', user_id: 1 }
    ]);

    await getUserPostsController(req, res, next);

    expect(res.json).toHaveBeenCalledWith([
      { id: 1, title: 'Post 1', content: 'Content 1', user_id: 1 }
    ]);
  });
});
