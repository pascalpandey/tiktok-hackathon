import { prisma } from "../helpers";

export async function POST(req) {
  const { data } = await req.json();
  
  const existingUser = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (existingUser) {
    return new Response("Username already taken!", { status: 400 });
  }
  
  await prisma.user.create({
    data,
  });

  return new Response("OK", { status: 200 });
}

export async function PATCH(req) {
  const { data } = await req.json();

  const updateUser = await prisma.user.update({
    where:{
      username: data.sender,
    },
    data:{
      bio: data.bio || undefined,
      name: data.name || undefined,
      imgUrl: data.imgUrl || undefined
    }
  })

  return new Response("OK", { status: 200 });
}



export async function GET(req) {
  try {
    const userName = await req.nextUrl.searchParams.get('userName');

      const user = await prisma.user.findUnique({
        where: {
          username: userName,
        },
        include:{
          following:{
            select:{
              username:true,
            }
          },
          followers:{
            select:{
              username:true,
            }
          },
          reviews:true,
          wishlist: {
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

      if (!user) return new Response("Username not found!", { status: 404 });
      
      return new Response(JSON.stringify({
        "username":user.username,
        "name":user.name,
        "bio":user.bio,
        "imgUrl":user.imgUrl,
        "following":user.following,
        "followers":user.followers,
        "reviews":user.reviews,
        "likes":user.likes,
        "shop":user.shop,
        "wishlist": user.wishlist
      }), { status: 200 }); 
    
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}


