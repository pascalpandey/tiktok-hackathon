import Link from "next/link";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs"
import ShopItem from "./ShopItem";

const SubWishlist = ({ wishlist, maxLength }) => {
  return (
    wishlist?.wishlist?.length > 0 && (
      <div className=" h-96 flex flex-col">
        <div className="mt-4 w-1/2 h-10 flex flex-row">
          <div className="w-10 h-10 relative border rounded-full">
            <Image layout={'fill'} objectFit={'contain'} alt="product image" src={wishlist.wishlist[0].item.shop.user.imgUrl} />
          </div>
          <Link className=" ml-2 pt-2 font-bold" href={`/user/${wishlist.username}`}>{wishlist.username}</Link>
        </div>
        <div className="w-fit  mt-2 h-auto border p-3 pr-1 rounded-md flex flex-row gap-2 overflow-x-auto">
          {
            wishlist?.wishlist?.map((item, i) => {
              return <ShopItem
                key={i}
                h={72}
                w={56}
                productName={item.name}
                desc={item.description}
                price={`$${item.price}`}
                location="Singapore"
                rating={item.rating}
                imageUrl={item.imageUrl}
                username={item.shop.user.username}
                itemId={item.itemId}
              />;
            })
          }
          <div className="flex items-center">
            {wishlist?.wishlist?.length === maxLength && <Link className="text-lg text-gray-300 hover:text-ttred" href={`/user/${wishlist.username}`}>
              <div className="flex flex-row items-center">
                <p className="ml-4">View more</p>
                <BsArrowRight className="ml-1 mr-3" size={22} />
              </div>
            </Link>}
          </div>
        </div>
      </div>
    )
  )
}

export default SubWishlist;