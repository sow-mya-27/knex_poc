import { Knex } from "knex";
import db from "../../config/database";
import {
  Comment,
  createComment,
  deleteComment,
  getComment,
  updateComment
} from "../../services/commentModel";
jest.mock("../../config/database", () => {
  const mKnex = { count: jest.fn() };
  return jest.fn(() => mKnex);
});
describe("Comment Service", () => {
  let mockKnex: Knex;
  beforeEach(() => {
    mockKnex = {} as Knex;
    jest.clearAllMocks();
  });

  it("should create a new comment", async () => {
    const newComment:Comment = { comment: 'This is a comment', post_id: 1, user_id:1 };
    (db as any).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue(newComment),
    });
    const comment = await createComment(newComment);
    expect(comment).toEqual(newComment);
  });

  it("should get a comment by id", async () => {
    const newComment = { comment: 'This is a comment', post_id: 1, user_id:1 };

    (db as any).mockReturnValue({
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockResolvedValue([newComment]),
    });

    const comments = await getComment(1);

    expect(comments).toEqual([newComment]);
  });

  it("should update a comment", async () => {
    (db as any).mockReturnValue({
      where: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      returning: jest
        .fn()
        .mockResolvedValue([
          { comment: 'This is a comment', post_id: 1, user_id:1 },
        ]),
    });

    const comment = await updateComment(1, { comment: 'This is a comment', post_id: 1, user_id:1 });

    expect(comment).toEqual([
      { comment: 'This is a comment', post_id: 1, user_id:1 },
    ]);
  });

  it("should delete a comment", async () => {
    (db as any).mockReturnValue({
      where: jest.fn().mockReturnThis(),
      del: jest.fn().mockResolvedValue(1),
    });

    const result = await deleteComment(1);

    expect(result).toBe(1);
  });
});
