import { prisma } from "../helpers";

export async function POST(req) {
  const { data } = await req.json();

  await prisma.item.create({
    data
  })

  return new Response("OK")
}