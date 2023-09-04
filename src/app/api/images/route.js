import { PrismaClient } from '@prisma/client'

export async function POST(req) {
  const prisma = new PrismaClient()
  const body = await req.json()

  await prisma.image.create({
    data: {
      url: body
    }
  })

  return new Response("OK")
}