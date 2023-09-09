import { prisma, auth } from "../../helpers";

export async function GET(req) {
  const username = await req.nextUrl.searchParams.get("username");
  const token = await req.nextUrl.searchParams.get("token");

  const user = await auth(token)

  if (!user) {
    return new Response("Unauthorized!", { status: 401 });
  }

  const { following } = await prisma.user.findUnique({
    where: {
      username: user.username
    },
    select: {
      following: true
    }
  })

  const followed = following.some(obj => obj.username === Number(username))

  return new Response(followed, { status: 200 });
}
