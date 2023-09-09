"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillStar, AiOutlineStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import LoginSignupGeneric from '../../../components/loginSignupGeneric'
import WishlistButton from "../../../components/wishlistButton"



const ShopItem = ({ h, w, productName, price, rating, location, imageUrl, username, itemId, }) => {
  const fullStar = new Array(Math.floor(rating ?? 0)).fill(0);
  const noStar = new Array(5 - Math.floor(rating ?? 0)).fill(0);
  return (
    <div>
      <Link href={`/user/${username}/products/${itemId}`} className={`z-0 w-56`}>
        <div className={`w-${w} h-${h} border rounded-md p-2 bg-gray-50 hover:bg-gray-100 transition duration-100 ease-in`}>
          <div className='rounded-md border h-44 mb-1 bg-white relative'>
            <Image src={imageUrl} layout={'fill'} objectFit={'contain'} alt="product image" />
          </div>
          <div className='flex flex-row justify-between w-full'>
            <div className='flex flex-col'>
              <p className='text-sm leading-4 font-light mb-1 truncate w-[160px]'>{productName}</p>
              <p className='font-bold text-lg'>SGD {price}</p>
            </div>
            <LoginSignupGeneric>

              <WishlistButton itemId={itemId} />
            </LoginSignupGeneric>



          </div>
          <p className='font-light text-sm '>{location}</p>
          <div className='flex flex-row'>
            {fullStar.map((_, i) =>
              <AiFillStar className="mt-1 mr-1" size={15} color="#FE2C55" key={i}/>
            )}
            {noStar.map((_, i) => <AiOutlineStar className='mt-1 mr-1' color="#FE2C55" size={15} key={i}/>)}
            <p className='mt-0.5 ml-1.5 font-light text-sm'>{rating ? `${rating} / 5` : 'No rating'}</p>
          </div>


        </div>
      </Link>
    </div>
  )
}

export default ShopItem