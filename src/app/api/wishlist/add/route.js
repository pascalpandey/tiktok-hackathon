import { auth, prisma } from "../../helpers";

export async function PATCH(req) {
  const { data } = await req.json();

  const user = await auth(data.token)

  if (!user) {
    return new Response("Unauthorized!", { status: 401 });
  }

  const { wishlist } = await prisma.user.findUnique({
    where: {
      username: user.username,
    },
    select: {
      wishlist: {
        select: {
          itemId: true,
        },
      },
  }});
  
  const { listedBy } = await prisma.item.findUnique({
    where: {
      itemId: data.itemId,
    },
    select: {
      listedBy: {
        select: {
          username: true,
        },
      },
    },
  });

  await prisma.user.update({
    where: {
      username: user.username,
    },
    data: {
      wishlist: {
        connect: [...wishlist, { itemId: data.itemId }],
      },
    },
  });

  await prisma.item.update({
    where: {
      itemId: data.itemId,
    },
    data: {
      listedBy: {
        connect: [...listedBy, { username: user.username }],
      },
    },
  });

  return new Response("OK", { status: 200 });
}
