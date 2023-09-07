import { auth, prisma } from "../helpers";

export async function POST(req) {
  const { data } = await req.json();
  const token = await req.headers.get("authorization");

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

export async function GET(req) {
  const itemId = await req?.nextUrl?.searchParams?.get("itemId");

  if (!itemId) {
    const skip = await req.nextUrl.searchParams.get("skip");
    const take = await req.nextUrl.searchParams.get("take");

    const allItems = await prisma.item.findMany({
      skip: Number(skip),
      take: Number(take),
      include: {
        shop: {
          include: {
            user: {
              select: {
                username: true
              }
            }
          }
        }
      }
    });

    return new Response(JSON.stringify(allItems));
  } else {
    const item = await prisma.items.findUnique({
      data: {
        id: itemId,
      },
    });
    return new Response(JSON.stringify(item));
  }
}
