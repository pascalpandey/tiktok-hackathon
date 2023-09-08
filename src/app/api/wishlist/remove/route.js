import { prisma, auth } from "../../helpers";

export async function PATCH(req) {
  const { data } = await req.json();

  const user = await auth(data.token)

  if (!user) {
    return new Response("Unauthorized!", { status: 401 });
  }

  await prisma.user.update({
    where: {
      username: user.username,
    },
    data: {
      wishlist: {
        disconnect: [{ itemId: data.itemId }],
      },
    },
  });

  await prisma.item.update({
    where: {
      itemId: data.itemId,
    },
    data: {
      listedBy: {
        disconnect: [{ username: user.username }],
      },
    },
  });

  return new Response("OK", { status: 200 });
}
