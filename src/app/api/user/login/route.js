import { PrismaClient } from "@prisma/client";
import  { generateToken } from "../../helpers";

export async function POST(req) {
  try {
    const prisma = new PrismaClient();
    const { data } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!existingUser) {
      return new Response("Username not found!", { status: 404 });
    } else if (existingUser.password !== data.password) {
      return new Response("Incorrect password!", { status: 401 });
    }

    const token = generateToken(existingUser);

    return new Response(token, { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}
