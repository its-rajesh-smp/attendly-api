import { UserService } from "@/services";
import { BcryptUtil, JWTUtil, ResponseUtil } from "@/utils";
import { Request, Response } from "express";
import { UserDTO } from "../dtos";

/**
 * Retrieves the logged-in user's information.
 * @param {Request} req The ExpressJS request object.
 * @param {Response} res The ExpressJS response object.
 * @returns {Promise<void>}
 */

const getUser = async (req: Request, res: Response) => {
  const { id } = req.user;

  const existingUser = await UserService.findOne({ id });
  if (!existingUser) {
    return ResponseUtil.sendErrorResponse(res, "NOT_FOUND");
  }

  const payload = {
    ...existingUser,
    password: undefined,
  };

  return ResponseUtil.sendResponse(res, "SUCCESS", payload);
};

/**
 * Registers a new user and returns the user's information and a JSON Web Token for authentication.
 * @param {Request} req The ExpressJS request object.
 * @param {Response} res The ExpressJS response object.
 * @returns {Promise<void>}
 */
const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = UserDTO.userRegistrationSchema.parse(
    req.body
  );

  const existingUser = await UserService.findOne({ email });
  if (existingUser) {
    return ResponseUtil.sendErrorResponse(res, "BAD_REQUEST", null);
  }

  const hashedPassword = await BcryptUtil.createHash(password);

  const user = await UserService.createOne({
    email,
    password: hashedPassword,
    name,
  });

  const authToken = JWTUtil.createJWTToken({ id: user.id, email: user.email });

  const payload = {
    ...user,
    authToken,
    password: undefined,
  };

  return ResponseUtil.sendResponse(res, "CREATED", payload);
};

/**
 * Logs in a user and returns the user's information and a JSON Web Token for authentication.
 * @param {Request} req The ExpressJS request object.
 * @param {Response} res The ExpressJS response object.
 * @returns {Promise<void>}
 */
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = UserDTO.userLoginSchema.parse(req.body);

  const user = await UserService.findOne({ email });
  if (!user) {
    return ResponseUtil.sendErrorResponse(res, "NOT_FOUND");
  }

  const isValidPassword = await BcryptUtil.compareHash(password, user.password);

  if (!isValidPassword) {
    return ResponseUtil.sendErrorResponse(res, "BAD_REQUEST");
  }

  const authToken = JWTUtil.createJWTToken({ id: user.id, email: user.email });

  const payload = {
    ...user,
    authToken,
    password: undefined,
  };

  return ResponseUtil.sendResponse(res, "CREATED", payload);
};

export default { getUser, registerUser, loginUser };
