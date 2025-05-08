import { UserService } from "@/services";
import { DecodedUserJWT } from "@/types/others.type";
import { JWTUtil, ResponseUtil } from "@/utils";
import { NextFunction, Request, Response } from "express";

export const OptionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    if (token && token.trim() !== "") {
      try {
        const decoded = JWTUtil.verifyJWTToken(token);
        const { email, id } = decoded as DecodedUserJWT;

        const user = await UserService.findOne({ id });

        if (!user) {
          return ResponseUtil.sendErrorResponse(res, "UNAUTHORIZED");
        }

        if (user) {
          req.user = {
            email,
            id,
            name: user.name,
          };
        }
      } catch (error) {
        return ResponseUtil.sendErrorResponse(res, "UNAUTHORIZED");
      }
    }
  }

  next();
};
