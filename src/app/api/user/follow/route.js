import { prisma } from "../../helpers";

export async function PATCH(req) {
    const { data } = await req.json();

    const selfInfo = await prisma.user.findUnique({
        where: {
            username: data.self
        },
        select: {
            following: {
                select: {
                    username: true,
                }
            },
            followers: {
                select: {
                    username: true,
                }
            },
        }
    })
    const targetInfo = await prisma.user.findUnique({
        where: {
            username: data.target,
        },
        select: {
            following: {
                select: {
                    username: true,
                }
            },
            followers: {
                select: {
                    username: true,
                }
            },
        }
    })
    console.log("self ", selfInfo)
    console.log("target ", targetInfo)

    await prisma.user.update({
        where:{
            username:data.self,
        },
        data: {
            following: {
                connect: [...selfInfo.following,{username:data.target}],
            },
        },
    })

    await prisma.user.update({
        where:{
            username:data.target,
        },
        data: {
            followers: {
                connect: [...targetInfo.followers,{username:data.self}],
            },
        },
    })



    return new Response("OK", { status: 200 });
}

