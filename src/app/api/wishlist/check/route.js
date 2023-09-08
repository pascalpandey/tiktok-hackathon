import { prisma, auth } from "../../helpers";

export async function GET(req) {
  const itemId = await req.nextUrl.searchParams.get("itemId");
  const token = await req.nextUrl.searchParams.get("token");

  const user = await auth(token)

  if (!user) {
    return new Response("Unauthorized!", { status: 401 });
  }

  const { wishlist } = await prisma.user.findUnique({
    where: {
      username: user.username
    },
    select: {
      wishlist: true
    }
  })

  const added = wishlist.some(obj => obj.itemId === Number(itemId))

  return new Response(added, { status: 200 });
}
