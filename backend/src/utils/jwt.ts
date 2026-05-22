import "dotenv/config";
import jwt from "jsonwebtoken";
export interface JwtPayloadCustom {
  id: string;
}
export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
