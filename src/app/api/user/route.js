import { prisma } from "../helpers";

export async function POST(req) {
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
