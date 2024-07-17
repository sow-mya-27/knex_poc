import { createPostController, getPostController, updatePostController, deletePostController } from '../../controllers/postController';
import { createPost, getPost, updatePost, deletePost } from '../../services/postModel';
import { mockRequest, mockResponse, mockNext } from './commentController.test';

jest.mock('../../services/postModel');

describe('Post Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new post', async () => {
    const req = mockRequest({ title: 'New Post', content: 'This is a new post' });
    const res = mockResponse();
    const next = mockNext();

    (createPost as jest.Mock).mockResolvedValue({ id: 1, title: 'New Post', content: 'This is a new post' });

    await createPostController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'New Post', content: 'This is a new post' });
  });

  it('should get a post by id', async () => {
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (getPost as jest.Mock).mockResolvedValue({ id: 1, title: 'New Post', content: 'This is a new post' });

    await getPostController(req, res, next);

    expect(res.status).not.toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'New Post', content: 'This is a new post' });
  });

  it('should return 404 if post not found', async () => {
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (getPost as jest.Mock).mockResolvedValue(null);

    await getPostController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' });
  });

  it('should update a post', async () => {
    const req = mockRequest({ title: 'Updated Post', content: 'Updated content' }, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (updatePost as jest.Mock).mockResolvedValue({ id: 1, title: 'Updated Post', content: 'Updated content' });

    await updatePostController(req, res, next);

    expect(res.status).not.toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'Updated Post', content: 'Updated content' });
  });

  it('should delete a post', async () => {
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();
    const next = mockNext();

    (deletePost as jest.Mock).mockResolvedValue(1);

    await deletePostController(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });
  it('should handle error during comment creation', async () => {
    const req = mockRequest({ title: 'New Post', content: 'This is a new post'  });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (createPost as jest.Mock).mockRejectedValue(error);

    await createPostController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  it('should handle error during comment get by id', async () => {
    const req = mockRequest({ title: 'New Post', content: 'This is a new post'  });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (getPost as jest.Mock).mockRejectedValue(error);

    await getPostController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  
  it('should handle error during comment updation', async () => {
    const req = mockRequest({ title: 'New Post', content: 'This is a new post'  });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (updatePost as jest.Mock).mockRejectedValue(error);

    await updatePostController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  it('should handle error during comment deletion', async () => {
    const req = mockRequest({ title: 'New Post', content: 'This is a new post'  });
    const res = mockResponse();
    const next = mockNext();

    const error = new Error('Failed to create comment');
    (deletePost as jest.Mock).mockRejectedValue(error);

    await deletePostController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  it('should return 404 if comment not found in update', async () => {
    const req = mockRequest({ name: 'John Doe', email: 'john@example.com' }, { id: '100' });
    const res = mockResponse();
    const next = mockNext();

    (updatePost as jest.Mock).mockResolvedValue(null);

    await updatePostController(req, res, next);    

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' });
  });
  it('should return 404 if comment not found in delete', async () => {
    const req = mockRequest({}, { id: '100' });
    const res = mockResponse();
    const next = mockNext();

    (deletePost as jest.Mock).mockResolvedValue(null);

    await deletePostController(req, res, next);    

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' });
  });
});
