import { prisma, auth } from "../helpers";

export async function GET(req) {
  const query = await req.nextUrl.searchParams.get("query");

  if (!query) {
    const items = await prisma.item.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 5
    });
    return new Response(JSON.stringify({ items }), { status: 200 });
  } else {
    const items = await prisma.item.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 5
    });

    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: query,
        },
      },
      take: 5
    });

    return new Response(JSON.stringify({ items, users }), { status: 200 });
  }
}
