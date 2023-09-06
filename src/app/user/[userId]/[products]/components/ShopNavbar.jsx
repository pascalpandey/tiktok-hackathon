"use client"
import React, { useState } from "react";
import Link from "next/link";

export default function ShopNavbar() {
    return (
        <div className="w-full">
            <div className="mx-auto w-480">
                <div className='flex'>
                    {/* JK blh bantu routing + file structurenya g, thanks! */}
                    <Link href="/products" className="font-medium hover:text-gray-700 border-gray-700 px-5 py-3 text-gray-500 hover:text-gray-700">
                        Details
                    </Link>
                    <Link href="/testimonies" className="font-medium hover:text-gray-700  border-gray-700 text-gray-500 px-5 py-3 hover:text-gray-700">
                        Reviews
                    </Link>
                    <Link href="/testimonies" className="font-medium hover:text-gray-700  border-gray-700 text-gray-500 px-5 py-3 hover:text-gray-700">
                        Discussion
                    </Link>
                    <Link href="/live" className="font-medium hover:text-gray-700  border-gray-700 text-gray-500 px-5 py-3 hover:text-gray-700">
                        Recommended
                    </Link>
                </div>
            </div>
        </div>
    );
}