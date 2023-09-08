import Link from "next/link";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs"
const SubWishlist = ({ user }) => {
    const wishlists = user.wishlists.slice(0, Math.min(user.wishlists.length, 5));

    return (
        <div className=" h-96 flex flex-col">
            <div className="mt-4 w-1/2 h-10 flex flex-row">
                <div className="w-10 h-10 relative border rounded-full">
                    <Image layout={'fill'} objectFit={'contain'} alt="product image" src={""} />
                </div>
                <Link className=" ml-2 pt-2 font-bold" href={`/user/${user.username}`}>{user.username}</Link>
            </div>
            <div className="w-fit  mt-2 h-auto border p-3 pr-1 rounded-md flex flex-row gap-2 overflow-x-auto">

                {
                    wishlists.map((item) => {
                        return item;
                    })
                }
                <div className="flex items-center">
                    {user.wishlists.length>5 && <Link className="text-lg text-gray-300 hover:text-ttred" href={`/user/${user.username}`}>
                        <div className="flex flex-row items-center">
                            <p className="ml-4">View more</p>
                            <BsArrowRight className="ml-1 mr-3" size={22}/>
                        </div>
                    </Link>}
                </div>
            </div>
        </div>
    )
}

export default SubWishlist;