"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillStar, AiOutlineStar, AiOutlineHeart} from 'react-icons/ai'


const ShopItem = ({ h, w, productName, price, rating, location, imageUrl, username, itemId }) => {
    const fullStar = new Array(Math.floor(rating ?? 0)).fill(0);
    const noStar = new Array(5 - Math.floor(rating ?? 0)).fill(0);
    return (
        <Link href={`/user/${username}/${itemId}`} className={`z-0 w-56`}>
            <div className={`w-${w} h-${h} border rounded-md p-2 bg-gray-50 hover:bg-gray-100 transition duration-100 ease-in`}>
                <div className='rounded-md border h-44 mb-1 bg-white relative'>
                    <Image src={imageUrl} layout={'fill'} objectFit={'contain'} alt="product image"/>
                </div>
                <div className='flex flex-row justify-between w-full'>
                    <div className='flex flex-col'>
                        <p className='text-sm leading-4 font-light mb-2'>{productName}</p>
                        <p className='font-bold text-lg'>SGD {price}</p>
                    </div>
                    <button onClick={(e)=>{e.preventDefault();}}className='mt-0.5 border-2 border-ttred w-8 h-8 rounded hover:bg-red-50 flex items-center z-10'>
                        <AiOutlineHeart className='mx-auto ' size={24} color="#FE2C55"/>
                    </button>


                </div>
                <p className='font-light text-sm '>{location}</p>
                <div className='flex flex-row'>
                    {fullStar.map((i) =>
                        <AiFillStar className="mt-1 mr-1" size={15} color="#FE2C55" />
                    )}
                    {noStar.map((i) => <AiOutlineStar className='mt-1 mr-1' color="#FE2C55" size={15} />)}
                    <p className='mt-0.5 ml-1.5 font-light text-sm'>{rating ? `${rating} / 5` : 'No rating'}</p>
                </div>


            </div>
        </Link>
    )
}

export default ShopItem