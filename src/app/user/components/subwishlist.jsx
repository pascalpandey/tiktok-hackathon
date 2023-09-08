import Link from "next/link";
import Image from "next/image";

const SubWishlist = ({user}) => {
    const wishlists = user.wishlists.slice(0,Math.min(user.wishlists.length , 3));

    return(
        <div className="w-full h-96 flex flex-col">
            <div className="mt-4 w-1/2 h-10 flex flex-row">
                <div className="w-8 h-8 relative border rounded-full">
                    <Image layout={'fill'} objectFit={'contain'} alt="product image" src={""} />
                </div>
                <Link className="italic ml-2 pt-2 font-bold" href={`/user/${user.username}`}>{user.username}</Link>
            </div>
            <div className="w-full h-auto flex flex-row">            
              {
                    wishlists.map((item) => {
                        return item;
                    })
                }
                <div className="w-72 flex px-8 items-center">
                    <Link className="text-lg text-gray-300 hover:text-ttred" href={`/user/${user.username}`}>{"View More >>"}</Link>
                </div>
            </div>
        </div>
    )
}

export default SubWishlist;