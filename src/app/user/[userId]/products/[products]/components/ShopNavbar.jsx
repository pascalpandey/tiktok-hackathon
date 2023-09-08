"use client"
import React, { useState } from "react";
import Link from "next/link";

export default function ShopNavbar() {
    return (
        <div className="fixed w-full bg-white">
            <div className="mx-auto w-fit">
                <div className='flex mr-96'>

                    <Link href="#Details-tag" className="font-medium hover:text-gray-700 border-gray-700 px-5 py-3 text-gray-500 ">
                        Details
                    </Link>
                    <Link href="#Reviews-tag" className="font-medium hover:text-gray-700  border-gray-700 text-gray-500 px-5 py-3 ">
                        Reviews
                    </Link>
                </div>
            </div>
        </div>
    );
}