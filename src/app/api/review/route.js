import { auth, prisma } from "../helpers";

export async function POST(req) {
  try {
    const { data } = await req.json();
    const token = await req.headers.get("authorization");

    const user = await auth(token);

    if (!user) return new Response("Unauthorized!", { status: 401 });

    const item = await prisma.item.findUnique({
      where: {
        itemId: data.itemId,
      },
      select: {
        reviews: true,
        rating: true,
      },
    });

    const newRating =
      (item.rating * item.reviews.length + data.rating) /
      (item.reviews.length + 1);

    await prisma.item.update({
      where: {
        itemId: data.itemId,
      },
      data: {
        rating: newRating,
      },
    });

    await prisma.review.create({
      data: {
        rating: data.rating,
        description: data.description,
        videoUrl: data.videoUrl,
        item: {
          connect: {
            itemId: data.itemId,
          },
        },
        user: {
          connect: {
            userId: user.userId,
          },
        },
      },
    });

    return new Response("OK");
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const reviewId = await req?.nextUrl?.searchParams?.get('reviewId');

    if (!reviewId) {
      const skip = await req.nextUrl.searchParams.get("skip");
      const take = await req.nextUrl.searchParams.get("take");

      const allReviews = await prisma.review.findMany({
        skip: Number(skip),
        take: Number(take),
        include: {
          user: {
            select: {
              username: true,
              imgUrl: true,
              userId: true,
              name: true,
            }
          },
          item: true
        }
      })

      return new Response(JSON.stringify(allReviews), { status: 200 });
    } else {

    }

  } catch(err) {
    return new Response(err, { status: 500 });
  }
}
