import React from 'react'
import Image from 'next/image'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const ShopItem = ({ productName, desc, price, rating, location}) => {
    const fullStar = new Array(Math.floor(rating)).fill(0);
    const noStar = new Array(5-Math.floor(rating)).fill(0);
    return (
        <div>
            <div className='w-52 h-68 border m-2 rounded-md p-2 bg-gray-50'>
                <div className='rounded-md border h-36 mb-1 bg-white'>
                    <Image src="" />
                </div>
                <p className='text-sm leading-4 font-light mb-1'>{productName}</p>
                <p className='font-bold text-lg'>SGD {price}</p>
                <p className='font-light text-sm mb-1'>{location}</p>
                <div className='flex flex-row'>
                    {fullStar.map((i)=>
                    <AiFillStar className="mt-1 mr-1" size={15} color="#FE2C55"/>
                    )}
                    {noStar.map((i)=><AiOutlineStar className='mt-1 mr-1' color="#FE2C55" size={15}/>)}
                    <p className='mt-0.5 ml-1.5 font-light text-sm'>{rating} / 5</p>
                </div>


            </div>
        </div>
    )
}

export default ShopItem