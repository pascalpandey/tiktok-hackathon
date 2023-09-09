import { prisma, auth } from "../helpers";

export async function GET(req) {
  const query = await req.nextUrl.searchParams.get("query");

  if (!query) {
    const products = await prisma.item.findMany({
      where: {
        name: {
          contains: query.replace("%20", " "),
          mode: 'insensitive'
        },
      },
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
      },
      take: 5
    });
    return new Response(JSON.stringify({ products }), { status: 200 });
  } else {
    const products = await prisma.item.findMany({
      where: {
        name: {
          contains: query.replace("%20", " "), 
          mode: 'insensitive'
        },
      },
      take: 5
    });

    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: query.replace("%20", " "),
          mode: 'insensitive'
        },
      },
      take: 5
    });

    return new Response(JSON.stringify({ products, users }), { status: 200 });
  }
}
