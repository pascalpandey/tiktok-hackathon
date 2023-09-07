import { auth, prisma } from "../helpers";

export async function POST(req) {
  const { data } = await req.json();
  const token = await req.headers.get("authorization");

  const user = await auth(token);

  if (!user) return new Response("Unauthorized!", { status: 401 });

  const item = await prisma.item.findUnique({
    where: {
      itemId: data.itemId
    },
    select: {
      reviews: true,
      rating: true
    }
  })

  const newRating = (item.rating * item.reviews.length + data.rating) / (item.reviews.length + 1);

  await prisma.item.update({
    where: {
      itemId: data.itemId
    },
    data: {
      rating: newRating
    }
  })

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
    },
  });

  return new Response("OK");
}