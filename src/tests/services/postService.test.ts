import { Knex } from "knex";
import db from "../../config/database";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
  Post
} from "../../services/postModel";
jest.mock("../../config/database", () => {
  const mKnex = { count: jest.fn() };
  return jest.fn(() => mKnex);
});
describe("Post Service", () => {
  let mockKnex: Knex;
  beforeEach(() => {
    mockKnex = {} as Knex;
    jest.clearAllMocks();
  });

  it("should create a new post", async () => {
    const newPost:Post = {
      title: 'New Post', body: 'This is a new post', user_id: 1, id: 1,
      post_id: 0
    };
    (db as any).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue(newPost),
    });
    const post = await createPost(newPost);
    expect(post).toEqual(newPost);
  });

  it("should get a post by id", async () => {
    const newPost = { title: 'New Post', body: 'This is a new post',user_id:1,id:1  };

    (db as any).mockReturnValue({
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockResolvedValue([newPost]),
    });

    const posts = await getPost(1);

    expect(posts).toEqual([newPost]);
  });

  it("should update a post", async () => {
    (db as any).mockReturnValue({
      where: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      returning: jest
        .fn()
        .mockResolvedValue([
          { title: 'New Post', body: 'This is a new post',user_id:1,id:1  },
        ]),
    });

    const post = await updatePost(1, { title: 'New Post', body: 'This is a new post',user_id:1,id:1  });

    expect(post).toEqual([
      { title: 'New Post', body: 'This is a new post',user_id:1,id:1  },
    ]);
  });

  it("should delete a post", async () => {
    (db as any).mockReturnValue({
      where: jest.fn().mockReturnThis(),
      del: jest.fn().mockResolvedValue(1),
    });

    const result = await deletePost(1);

    expect(result).toBe(1);
  });
});
