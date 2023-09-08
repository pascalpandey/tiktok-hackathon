import { prisma } from "../helpers"
export async function POST(req){
    const { data } = await req.json();
    console.log(data);
    
    return new Response("OK", { status: 200 });
}

export async function GET(req){
    try {
        const reviewId = await req.nextUrl.searchParams.get('reviewId');
    
        if (!reviewId) return new Response("No token provided!", { status: 404 });

        const comments = await prisma.review.findUnique({
            where:{
                reviewId:reviewId
            }, 
            include:{
                comments:{
                    include:{
                        user:{
                            include:{
                                username:true,
                                imgUrl:true,
                            }
                        }
                    }
                }
            }
        })
        return new Response(JSON.stringify(comments), {status:200})
    
      } catch (err) {
        return new Response(err, { status: 500 });
      }
}