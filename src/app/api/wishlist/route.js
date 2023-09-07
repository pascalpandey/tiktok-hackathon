import { auth, prisma } from "../../helpers";

export async function GET(req) {
    try {
        const token = await req.headers.get("authorization");

        const user = await auth(token);

        if (!user) return new Response("Unauthorized!", { status: 401 });

        if (!user.wishlist) {
            await prisma.wishlist.create({
                data: {
                    user: {
                        connect: {
                        userId: user.userId,
                        },
                    },
                },
            });
        }

        const wishlist = prisma.wishlist.findUnique({
            data: {
                userId: user.userId 
            }
        })

        return new Response(JSON.stringify(wishlist));


    } catch (err) {
        return new Response(err, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { data } = await req.json();
        const token = await req.headers.get("authorization");

        const user = await auth(token);

        if (!user) return new Response("Unauthorized!", { status: 401 });

        if (!user.wishlist) {
            await prisma.wishlist.create({
                data: {
                    user: {
                        connect: {
                        userId: user.userId,
                        },
                    },
                },
            });
        }

        const wishlist = await prisma.wishlist.update({
            where: {
                userId: user.userId
            },
            data: {
                items: {
                    push: data.itemId
                }
            }
        })

        return new Response(JSON.stringify(wishlist), { status: 200 });
    } catch (err) {
        return new Response(err, { status: 500 });
    }
}