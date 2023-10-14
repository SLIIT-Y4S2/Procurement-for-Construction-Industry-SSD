import { Request, Response } from "express";
import logger from "../utils/logger";
import {
  CreateUserInput,
  UpdateUserInput,
  // DeleteUserInput,
  // GetUserInput,
} from "../schema/user-management.schema";
import {
  createUser,
  listUsers,
  findAndUpdateUser,
  findUser,
  // deleteUser,
} from "../service/user-management.service";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  const body = req.body;
  try {
    const user = await createUser({ ...body });
    return res.status(201).send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getUserListHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const users = await listUsers();
    return res.send(users);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function updateUserHandler(
  req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
  res: Response
) {
  try {
    const userId = req.params.userId;
    const update = req.body;
    const user = await findUser({ userId });
    if (!user) {
      return res.sendStatus(404);
    }

    const updateUser = await findAndUpdateUser({ userId }, update, {
      new: true,
    });
    return res.send(updateUser);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

// export async function updateUserHandler(
//   req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
//   res: Response
// ) {
//   const body = req.body;
//   try {
//     const userId = req.params.userId;
//     const update = req.body;
//     const user = await findUser({ userId });

//     if (!user) {
//       return res.sendStatus(404);
//     }

//     const updatedUser = await findAndUpdateUser({ userId }, update, {
//       new: true,
//     });

//     return res.send(updatedUser);
//   } catch (error: any) {
//     logger.error(error);
//     return res.status(409).send(error.message);
//   }
// }

// export async function getUserHandler(
//   req: Request<GetUserInput["params"]>,
//   res: Response
// ) {
//   const userId = req.params.userId;
//   try {
//     const user = await findUser({ userId });
//     if (!user) {
//       return res.sendStatus(404);
//     }
//     return res.send(user);
//   } catch (error: any) {
//     logger.error(error);
//     return res.status(409).send(error.message);
//   }
// }

// export async function deleteUserHandler(
//   req: Request<DeleteUserInput["params"]>,
//   res: Response
// ) {
//   const userId = req.params.userId;
//   try {
//     const user = await findUser({ userId });

//     if (!user) {
//       return res.sendStatus(404);
//     }

//     const deletedUser = await deleteUser({ userId });

//     return res.send(deletedUser);
//   } catch (error: any) {
//     logger.error(error);
//     return res.status(409).send(error.message);
//   }
// }
