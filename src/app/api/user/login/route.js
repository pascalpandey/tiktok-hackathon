import { generateToken, verifyToken, prisma } from "../../helpers";

export async function POST(req) {
  try {
    const { data } = await req.json();

    const existingUser = await prisma.user?.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!existingUser) {
      return new Response("Username not found!", { status: 404 });
    } else if (existingUser.password !== data.password) {
      return new Response("Incorrect password!", { status: 401 });
    }

    const token = generateToken(existingUser);

    return new Response(token, { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const token = await req.nextUrl.searchParams.get('token');

    if (!token) return new Response("No token provided!", { status: 404 });

    const userData = verifyToken(token);

    if (userData && userData?.username) {
      const user = await prisma.user.findUnique({
        where: {
          username: userData.username,
        },
      });

      if (!user) return new Response("Username not found!", { status: 404 });

      return new Response(user.username, { status: 200 }); 
    } else {
      return new Response("Wrong token!", { status: 404 });
    }
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}
