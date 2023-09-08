import { prisma } from '../../helpers'
export async function GET(req) {
    try {
        const username = await req.nextUrl.searchParams.get('userName');

        const userProducts = await prisma.user.findUnique({
            where: {
                username: username,

            },
            include: {
                shop: {
                    include:{
                        items:true,
                    }
                }
            }
        });


        if (!username) return new Response("Username not found!", { status: 404 });

        return new Response(JSON.stringify(userProducts), { status: 200 });

    } catch (err) {
        return new Response(err, { status: 500 });
    }
}


