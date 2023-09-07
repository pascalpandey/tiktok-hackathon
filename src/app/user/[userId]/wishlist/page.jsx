import React from "react";
import WishlistProducts from "./WishlistProducts";

export default function WishlistPage() {
    const username = "AndrewDJ";

    return (
        <main>
            <WishlistProducts username={username}/>
        </main>
    )
}