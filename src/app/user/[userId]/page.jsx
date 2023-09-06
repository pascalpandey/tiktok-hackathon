import React from 'react'
import Image from 'next/image'
import { MdOutlineShoppingCart } from 'react-icons/md'
import ShopItem from '../components/ShopItem'

const UserPage = () => {
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
        <a className=" hover:border-b-2 border-gray-700 text-gray-500 px-5 py-3 hover:text-gray-700" href="/">Videos</a>
        <a className=" hover:border-b-2 border-gray-700 text-gray-500 px-5 py-3 hover:text-gray-700" href="/">Products</a>
        <a className="hover:border-b-2 border-gray-700 text-gray-500 px-5 py-3 hover:text-gray-700" href="/">Reviews</a>

      </div>
      <div className='border-b max-w-full w-full'></div>
      <div className='w-full flex-wrap max-w-full flex flex-row'>
        <ShopItem productName="2.0L water bote full metal al"
          price={123}
          location="singapore, singapore"
          rating={4.5} />
        <ShopItem productName="2.0L water bottle full metal "
          price={400}
          location="Singapore"
          rating={2} />
        <ShopItem productName="2.0L water bottle full metal "
          price={123}
          location="singapore, singapore"
          rating={5} />
       

      </div>

    </div>
  )
}

export default UserPage