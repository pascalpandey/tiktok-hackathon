import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const generateToken = (data, expiresIn = '90d') => {
  const options = {
    expiresIn,
  };
  return jwt.sign(data, process.env.JWT_SECRET_KEY, options);
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

export const prisma = new PrismaClient()