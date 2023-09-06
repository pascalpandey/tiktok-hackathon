import React from "react";
import ShopItem from '../user/components/ShopItem'

export default function WishListProducts() {
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
    )
}