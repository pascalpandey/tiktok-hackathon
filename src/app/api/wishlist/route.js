import { prisma } from "../../helpers";

export async function GET(req) {
  const skip = await req.nextUrl.searchParams.get("skip");
  const take = await req.nextUrl.searchParams.get("take");
  const username = await req.nextUrl.searchParams.get("username");

  const wishlist = await prisma.user.findUnique({
    skip: Number(skip),
    take: Number(take),
    where: {
      username: username
    },
    select: {
      following: {
        include: {
          wishlist: true
        }
      }
    }
  })

  return new Response(JSON.stringify(wishlist), { status: 200 });
}
