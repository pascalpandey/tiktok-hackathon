import { prisma } from "../../helpers";

export async function GET(req) {
  try {
    const reviewId = await req?.nextUrl?.searchParams?.get("reviewId");
    const itemId = await req?.nextUrl?.searchParams?.get("itemId");
    const skip = await req.nextUrl.searchParams.get("skip");
    const take = await req.nextUrl.searchParams.get("take");

    if (!reviewId) {
      // query all reviews on a product
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
          item: {
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
          }
        },
        where: {
          itemId: Number(itemId)
        }
      })

      return new Response(JSON.stringify(allReviews), { status: 200 });
    } else {
      // query page by page all reviews on the same product for a specific reviewId with the selected review on top
      if (Number(skip) === 0) {

        const currentReview = await prisma.review.findUnique({
          where: {
            reviewId: Number(reviewId),
          },
          include: {
            user: {
              select: {
                username: true,
                imgUrl: true,
                userId: true,
                name: true,
              }
            },
            item: {
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
            }
          }
        }); 

        return new Response(JSON.stringify(currentReview), { status: 200 });
      } else {
        const currentReview = await prisma.review.findUnique({
          where: {
            reviewId: Number(reviewId),
          },
        });
  
        const restOfReviews = await prisma.review.findMany({
          skip: Number(skip) - 1,
          take: Number(take),
          where: {
            NOT: {
              reviewId: Number(reviewId),
            },
            itemId: Number(currentReview.itemId),
          },
          include: {
            user: {
              select: {
                username: true,
                imgUrl: true,
                userId: true,
                name: true,
              }
            },
            item: {
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
            }
          }
        });
  
        return new Response(JSON.stringify(restOfReviews), { status: 200 });
      }
    }
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}
