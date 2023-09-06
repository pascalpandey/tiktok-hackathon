"use client"
import React, { useState } from "react";
import Link from "next/link";

export default function ShopNavbar() {
    return (
        <div className="w-full">
            <div className='flex justify-evenly py-3 border-b-2'>
                {/* JK blh bantu routing + file structurenya g, thanks! */}
                <Link href="/products" className="font-medium">
                    Products
                </Link>
                <Link href="/testimonies" className="font-medium">
                    Testimonies
                </Link>
                <Link href="/live" className="font-medium">
                    LIVE
                </Link>
            </div>
        </div>
    );
}