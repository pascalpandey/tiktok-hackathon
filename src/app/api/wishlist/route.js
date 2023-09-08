import { prisma, auth } from "../helpers";

export async function GET(req) {
  const skip = await req.nextUrl.searchParams.get("skip");
  const take = await req.nextUrl.searchParams.get("take");
  const rowAmount =  await req.nextUrl.searchParams.get("rowAmount");
  const token = await req.nextUrl.searchParams.get("token");
  
  const user = await auth(token)

  if (!user) {
    return new Response("Unauthorized!", { status: 401 });
  }

  const wishlist = await prisma.user.findUnique({
    where: {
      username: user.username
    },
    select: {
      following: {
        select: {
          wishlist: {
            include: {
              shop: {
                include: {
                  user: {
                    select: {
                      username: true,
                    },
                  },
                },
              },
            },
            take: Number(rowAmount)
          },
          username: true
        },
        skip: Number(skip),
        take: Number(take),
      }
    }
  })

  return new Response(JSON.stringify(wishlist), { status: 200 });
}
