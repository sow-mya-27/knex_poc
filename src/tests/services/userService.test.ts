import { Knex } from "knex";
import db from "../../config/database";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserPosts,
  User,
} from "../../services/userModel";
jest.mock("../../config/database", () => {
  const mKnex = { count: jest.fn() };
  return jest.fn(() => mKnex);
});
describe("User Service", () => {
  let mockKnex: Knex;
  beforeEach(() => {
    mockKnex = {} as Knex;
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    const newUser = { id: 1, name: "John Doe", email: "john@example.com" };
    (db as any).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue(newUser),
    });
    const user = await createUser(newUser);
    expect(user).toEqual(newUser);
  });

  it("should get a user by id", async () => {
    const newUser = { id: 1, name: "John Doe", email: "john@example.com" };

    (db as any).mockReturnValue({
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockResolvedValue([newUser]),
    });

    const posts = await getUser(1);

    expect(posts).toEqual([newUser]);
  });
  it("should get user posts by user id", async () => {
    (db as any).mockReturnValue({
      join: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      select: jest
        .fn()
        .mockResolvedValue([
          { id: 1, title: "Post 1", content: "Content 1", user_id: 1 },
        ]),
    });

    const posts = await getUserPosts(1);

    expect(posts).toEqual([
      { id: 1, title: "Post 1", content: "Content 1", user_id: 1 },
    ]);
  });

  it("should update a user", async () => {
    (db as any).mockReturnValue({
      where: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      returning: jest
        .fn()
        .mockResolvedValue([
          { id: 1, name: "John Doe", email: "john@example.com" },
        ]),
    });

    const user = await updateUser(1, {
      name: "John Doe",
      email: "john@example.com",
    });

    expect(user).toEqual([
      { id: 1, name: "John Doe", email: "john@example.com" },
    ]);
  });

  it("should delete a user", async () => {
    (db as any).mockReturnValue({
      where: jest.fn().mockReturnThis(),
      del: jest.fn().mockResolvedValue(1),
    });

    const result = await deleteUser(1);

    expect(result).toBe(1);
  });
});
