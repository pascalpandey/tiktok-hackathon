import React from "react";
import ShopItem from "../../components/ShopItem";
import { prisma } from "../../../api/helpers";

const WishlistProducts = async ({username}) => {
    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
        include: {
            shop: true
        }
    })

    let items;
    if (prisma.wishlist) {
        items = await prisma.wishlist.findUnique({
            where: {
                userId: user.userId
            },
        })
    }

    
    return (
        <div className='px-4 py-3 flex gap-1 flex-wrap  '>
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
            <div>{items}</div>
        </div>
    )
}

export default WishlistProducts;