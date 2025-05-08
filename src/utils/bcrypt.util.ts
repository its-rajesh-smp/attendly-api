import bcrypt from "bcrypt";
import { EnvUtil } from ".";

const createHash = (password: string) => {
  const SALT_ROUNDS = EnvUtil.getEnv("BCRYPT_SALT_ROUNDS") || 10;
  return bcrypt.hash(password, Number(SALT_ROUNDS));
};

const compareHash = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export default { createHash, compareHash };
