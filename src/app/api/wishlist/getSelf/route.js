import { prisma, auth } from "../../helpers";

export async function GET(req) {
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
      }
    }
  })

  return new Response(JSON.stringify(wishlist), { status: 200 });
}
