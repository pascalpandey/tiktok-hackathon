import React from "react";
import ShopItem from '../user/components/ShopItem'
import SubWishlist from "../user/components/subwishlist";
export default function WishListProducts() {
    const dummyItem = (
        <ShopItem productName={"kucing hansohee"}
            w={58}
            h={72}
            username={"bebekjk"}
            itemId={69420}
            imageUrl={""}
            price={69420}
            location="Seoul, Korea"
            rating={5}
        />
    )
    const tmpFollowing = [
        {
            username: "bebekjk",
            wishlists: [dummyItem, dummyItem, dummyItem, dummyItem, dummyItem, dummyItem],
            showWishlists: true,
            imageUrl: ""
        },
        {
            username: "bebekjkaa",
            wishlists: [dummyItem, dummyItem],
            showWishlists: true,
            imageUrl: ""
        },
        {
            username: "test1",
            wishlists: [dummyItem, dummyItem],
            showWishlists: false,
            imageUrl: ""
        },
        {
            username: "AndrewDJ",
            wishlists: [dummyItem, dummyItem],
            showWishlists: true,
            imageUrl: ""
        }
    ];
    return (
        <div className="pl-5">
            <h2 className='text-2xl w-full border-b font-bold mt-10'>Your Wishlist </h2>
            <div className='px-4 py-3 flex gap-2 flex-wrap  '>
                <ShopItem
                    h={72}
                    w={56}
                    productName="Nike Air Max 100"
                    desc="industry. Lorem Ipsum has been the industry's standard dummy"
                    price="$100.00"
                    location="Singapore"
                    rating={4.6}
                    inWishlist={true}
                />
                <ShopItem
                    h={72}
                    w={56}
                    productName="Nike Air Max 100"
                    desc="industry. Lorem Ipsum has been the industry's standard dummy"
                    price="$100.00"
                    location="Singapore"
                    rating={4.6}
                    inWishlist={true}
                /><ShopItem
                    h={72}
                    w={56}
                    productName="Nike Air Max 100"
                    desc="industry. Lorem Ipsum has been the industry's standard dummy"
                    price="$100.00"
                    location="Singapore"
                    rating={4.6}
                    inWishlist={true}
                />
            </div>
            {tmpFollowing.length &&
                <div className='w-full h-auto mt-12'>
                    <h2 className='text-xl border-b text-gray-400'>Also checkout your friends' wishlists </h2>
                    {
                        tmpFollowing.filter((fw) => {
                            return fw.showWishlists && fw.wishlists.length > 0
                        }).map((fw) => {
                            return <SubWishlist user={fw} />
                        })
                    }
                </div>
            }
        </div>
    )
}