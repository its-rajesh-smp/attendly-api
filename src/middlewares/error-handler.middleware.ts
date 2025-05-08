import { ErrorMessages } from "@/constants";
import { sendErrorResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";

const ErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("object");
  sendErrorResponse(res, ErrorMessages.INTERNAL_SERVER_ERROR, err);
};

export default ErrorHandler;
