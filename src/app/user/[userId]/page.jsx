"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { MdOutlineShoppingCart } from 'react-icons/md'
import ShopItem from '../components/ShopItem'
import ReviewMini from './[products]/components/ReviewMini'

const UserPage = () => {
  const [section, setSection] = useState("Videos")
  const setSectionFn=(args)=>{
    setSection(args);
  }
  const userName = "testShopkeeper";
  const name = "user's name";
  const isShop = true;
  const followers = 5;
  const following = 61;
  const likes = 2;
  const desc = "jual beli jual beli jual beli jual beli jual beli \
  jual beli jual beli  beli jual beli beli jual beli beli jual beli \
  beli jual beli ";
  return (
    <div className='p-9 w-full'>
      <div className='w-590 h-fit flex flex-col mb-14'>
        <div className='flex flex-row'>
          <Image className='w-28 h-28 rounded-full'></Image>

          <div className='flex mx-6 flex-col'>
            <div className='flex flex-row'>
              <p className='mb-1 text-xl font-bold'>{userName}</p>
              {isShop && <MdOutlineShoppingCart className="ml-2 mt-1" size={23} />}
            </div>
            <p className='mb-2'>{name}</p>
            <button className='mt-4 w-44 h-8 bg-ttred text-white rounded-sm'>Follow</button>
          </div>
        </div>
        <div className='flex flex-row mt-5 mb-2'>
          <div className='flex flex-row items-baseline'>
            <p className='text-lg font-bold'>{following}</p>
            <p className='mx-1 mr-5 text-gray-500 font-light'>Following</p>
          </div>
          <div className='flex flex-row items-baseline'>
            <p className='text-lg font-bold'>{followers}</p>
            <p className='mx-1 mr-5 text-gray-500 font-light'>Followers</p>
          </div>
          <div className='flex flex-row items-baseline'>
            <p className='text-lg font-bold'>{likes}</p>
            <p className='mx-1 text-gray-500 font-light'>Likes</p>
          </div>
        </div>
        <p className='font-light'>{desc}</p>
      </div>
      <div className='flex flex-row'>
        <button className={`${(section==="Videos")?"border-b-2 text-gray-700 border-gray-700":""} hover:text-gray-700 text-gray-500 px-5 py-3`} 
        onClick={()=>setSectionFn("Videos")}>Videos</button>
        <button className={`${(section==="Products")?"border-b-2 text-gray-700 border-gray-700":""} hover:text-gray-700 text-gray-500 px-5 py-3`} 
        onClick={()=>setSectionFn("Products")}
        >Products</button>
        <button className={`${(section==="Reviews")?"border-b-2 text-gray-700 border-gray-700":""} hover:text-gray-700 text-gray-500 px-5 py-3`} 
        onClick={()=>setSectionFn("Reviews")}
        >Reviews</button>

      </div>
      <div className='border-b max-w-full w-full mb-1'></div>
      {section==="Videos" && <div className='w-full flex-wrap max-w-full flex flex-row'>
        <ReviewMini caption="Videos sample caption"/>
        <ReviewMini caption="Videos sample caption"/>
      </div>}
      {section==="Products" && <div className='w-full flex-wrap max-w-full flex flex-row'>
        <ShopItem productName="2.0L water bote full metal al"
          w={58}
          h={72}
          price={123}
          location="singapore, singapore"
          rating={4.5} />
        <ShopItem productName="2.0L water bote full metal al"
          w={58}
          h={72}
          price={123}
          location="singapore, singapore"
          rating={4.5} />
      </div>}
      {section==="Reviews" && <div className='w-full flex-wrap max-w-full flex flex-row'>
        <ReviewMini caption="Review sample caption"/>
        <ReviewMini caption="Review sample caption"/>
        <ReviewMini caption="Review sample caption"/>
      </div>}

      

    </div>
  )
}

export default UserPage