import { auth, prisma } from "../helpers";

export async function POST(req) {
  const { data } = await req.json();
  const token = await req.headers.get('authorization')

  const user = await auth(token);

  if (!user) return new Response("Unauthorized!", { status: 401 });

  let shopId;
  if (!user.shop) {
    const newShop = await prisma.shop.create({
      data: {
        user: {
          connect: {
            userId: user.userId,
          },
        },
      },
    });
    shopId = newShop.id;
  } else {
    shopId = user.shop.shopId;
  }
  
  await prisma.item.create({
    data: {
      description: data.description,
      imageUrl: data.imageUrl,
      name: data.name,
      price: data.price,
      shop: {
        connect: {
          shopId: shopId,
        },
      },
    },
  });

  return new Response("OK");
}
