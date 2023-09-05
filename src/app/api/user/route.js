import { PrismaClient } from "@prisma/client";

export async function POST(req) {
  const prisma = new PrismaClient();
  const { data } = await req.json();
  
  const existingUser = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (existingUser) {
    return new Response("Username already taken!", { status: 400 });
  }
  
  await prisma.user.create({
    data,
  });

  return new Response("OK", { status: 200 });
}
