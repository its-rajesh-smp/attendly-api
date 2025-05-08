import jwt from "jsonwebtoken";
import { EnvUtil } from ".";

const createJWTToken = (payload: any) => {
  const JWT_SECRET = EnvUtil.getEnv("JWT_SECRET") || "secret";
  return jwt.sign(payload, JWT_SECRET);
};

const verifyJWTToken = (token: string) => {
  const JWT_SECRET = EnvUtil.getEnv("JWT_SECRET") || "secret";
  return jwt.verify(token, JWT_SECRET);
};

export default { createJWTToken, verifyJWTToken };
