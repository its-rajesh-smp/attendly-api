import { ResponseMessages } from "@/constants";
import { Response } from "express";

type TErrorResponseKey = keyof typeof ResponseMessages.errorMessages;
type TSuccessResponseKey = keyof typeof ResponseMessages.successMessages;

const sendResponse = (res: Response, key: TSuccessResponseKey, data: any) => {
  const { statusCode, message } = ResponseMessages.successMessages[key];
  return res.status(statusCode).json({ data, message }) as any;
};

const sendErrorResponse = (
  res: Response,
  key: TErrorResponseKey,
  details?: any
) => {
  const { statusCode, message } = ResponseMessages.errorMessages[key];
  return res.status(statusCode).json({ error: message, details }) as any;
};
export default { sendResponse, sendErrorResponse };
