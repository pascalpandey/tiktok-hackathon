import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export const generateToken = (data, expiresIn = "90d") => {
  const options = {
    expiresIn,
  };
  return jwt.sign(data, process.env.JWT_SECRET_KEY, options);
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

export const auth = async (token) => {
  if (!token) return false;

  const userData = verifyToken(token);

  if (userData && userData?.username) {
    const user = await prisma.user.findUnique({
      where: {
        username: userData.username,
      },
      include: {
        shop: true,
      },
    });

    if (!user) return false;

    return user;
  } else {
    return false;
  }
};

export const prisma = new PrismaClient()
