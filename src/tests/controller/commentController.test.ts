import { Request, Response } from 'express';
import { createCommentController, getCommentController, updateCommentController, deleteCommentController } from '../../controllers/commentController';
import { createComment, getComment, updateComment, deleteComment } from '../../services/commentModel';

jest.mock('../../services/commentModel');

export const mockRequest = (body = {}, params = {}) => ({
  body,
  params,
} as Request);

export const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext = () => jest.fn();

describe('Comment Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new comment', async () => {
    const req = mockRequest({ content: 'This is a comment', postId: 1 });
    const res = mockResponse();
    const next = mockNext();

    (createComment as jest.Mock).mockResolvedValue({ id: 1, content: 'This is a comment', postId: 1 });

    await createCommentController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, content: 'This is a comment', postId: 1 });
  });

  it('should get a comment by id', async () => {
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (getComment as jest.Mock).mockResolvedValue({ id: 1, content: 'This is a comment', postId: 1 });

    await getCommentController(req, res, next);

    expect(res.status).not.toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ id: 1, content: 'This is a comment', postId: 1 });
  });

  it('should return 404 if comment not found', async () => {
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (getComment as jest.Mock).mockResolvedValue(null);

    await getCommentController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Comment not found' });
  });

  it('should update a comment', async () => {
    const req = mockRequest({ content: 'Updated comment' }, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (updateComment as jest.Mock).mockResolvedValue({ id: 1, content: 'Updated comment', postId: 1 });

    await updateCommentController(req, res, next);

    expect(res.status).not.toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ id: 1, content: 'Updated comment', postId: 1 });
  });

  it('should delete a comment', async () => {
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (deleteComment as jest.Mock).mockResolvedValue(1);

    await deleteCommentController(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });
  it('should handle error during comment creation', async () => {
    const req = mockRequest({ content: 'This is a comment', postId: 1 });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (createComment as jest.Mock).mockRejectedValue(error);

    await createCommentController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  it('should handle error during comment get by id', async () => {
    const req = mockRequest({ content: 'This is a comment', postId: 1 });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (getComment as jest.Mock).mockRejectedValue(error);

    await getCommentController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  
  it('should handle error during comment updation', async () => {
    const req = mockRequest({ content: 'This is a comment', postId: 1 });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (updateComment as jest.Mock).mockRejectedValue(error);

    await updateCommentController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  it('should handle error during comment deletion', async () => {
    const req = mockRequest({ content: 'This is a comment', postId: 1 });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (deleteComment as jest.Mock).mockRejectedValue(error);

    await deleteCommentController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  it('should return 404 if comment not found in update', async () => {
    const req = mockRequest({ content: 'This is a comment', postId: 1 }, { id: '100' });
    const res = mockResponse();
    const next = mockNext();

    (updateComment as jest.Mock).mockResolvedValue(null);

    await updateCommentController(req, res, next);    

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Comment not found' });
  });
  it('should return 404 if comment not found in delete', async () => {
    const req = mockRequest({}, { id: '100' });
    const res = mockResponse();
    const next = mockNext();

    (deleteComment as jest.Mock).mockResolvedValue(null);

    await deleteCommentController(req, res, next);    

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Comment not found' });
  });
});
