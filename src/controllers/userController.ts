import { Request, Response, NextFunction } from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  User,
  getUserPosts
} from "../services/userModel";

async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await createUser(req.body as User);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

async function getUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await getUser(parseInt(req.params.id, 10));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}
async function getUserPostsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await getUserPosts(parseInt(req.params.id, 10));
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    res.json(user);
  } catch (error) {
    next(error);
  }
}
async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await updateUser(
      parseInt(req.params.id, 10),
      req.body as Partial<User>
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const rowsDeleted = await deleteUser(parseInt(req.params.id, 10));
    if (!rowsDeleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export {
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController,
  getUserPostsController
};
  
