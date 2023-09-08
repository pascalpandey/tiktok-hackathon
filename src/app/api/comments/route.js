
export async function POST(req){
    const { data } = await req.json();
    console.log(data);
    
    return new Response("OK", { status: 200 });
}

export async function GET(req){

}