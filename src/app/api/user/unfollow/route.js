import { prisma } from "../../helpers";

export async function PATCH(req) {
    const { data } = await req.json();

    await prisma.user.update({
        where:{
            username:data.self,
        },
        data: {
            following: {
                disconnect: [{username:data.target}],
            },
        },
    })

    await prisma.user.update({
        where:{
            username:data.target,
        },
        data: {
            followers: {
                disconnect: [{username: data.self}],
            },
        },
    })


    return new Response("OK", { status: 200 });
}