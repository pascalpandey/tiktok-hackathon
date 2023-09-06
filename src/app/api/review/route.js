import { PrismaClient } from '@prisma/client'

export async function POST(req) {
  const prisma = new PrismaClient()
  const { data } = await req.json();

  await prisma.review.create({
    data
  })

  return new Response("OK")
}