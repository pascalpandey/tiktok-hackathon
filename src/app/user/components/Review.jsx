import React from 'react'
import Image from "next/image"
import Link from "next/link";
import { PiShareFatFill } from 'react-icons/pi';
import { AiFillHeart, AiFillShopping, AiFillStar } from 'react-icons/ai';
import { GiShoppingBag } from 'react-icons/gi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import shopSvg from "../../../../public/shop.svg"
import Comments from './Comments';

const Review = ({ username, shop, desc, itemName, like, bm, comments, shared, reviewId, videoUrl, userImgUrl, rating, itemId }) => {
  return (

    <div className="flex h-620 w-590 border-b pb-4 mt-6 mx-auto">
      <div className="h-full w-20">
        <div className="rounded-full w-14 h-14 relative">
          <Link href={`/user/${username}`}>
            <Image
              className="rounded-full w-14 h-14"
              layout={'fill'}
              objectFit={'contain'}
              alt="profile image"
              src={userImgUrl ?? ""}
            />
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="relative flex flex-row h-fit w-full">
          <div className="flex flex-col">

            <div className="flex items-baseline">
              <Link href={`/user/${username}`} className="font-semibold mx-1">{username}</Link>
              <p className="font-light text-sm mx-1">{shop}</p>
            </div>

            <div className="max-w-sm">
              <p className="text-base font-light mx-1">{desc}</p>
            </div>

            <div className="flex flex-row ">
              <Link href={`/user/${username}/products/${itemId}`} className='flex'>
                <AiFillShopping className='mt-[6px]' color="#FE2C55" size={18}/>
                <p className="text-sm font-light mx-1 my-1">{itemName}</p>
              </Link>
              {/* <p>{"|"}</p> */}
              <AiFillStar className='mt-[5px] ml-1' color="#FE2C55" size={18}/>
              <p className="text-sm font-light mx-1 my-1">{`${rating} / 5`}</p>
            </div>

          </div>

          <button className="absolute w-24 h-8 border-ttred hover:bg-red-100 border right-0 my-1 text-ttred rounded-sm">
            Follow
          </button>
        </div>
        <div className="flex flex-row w-full h-full">

          <div className="h-full w-2/3 mx-1 rounded-lg bg-red">
            <div className="w-full h-full relative ">
              <video
                autoPlay
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              >
                <source src={videoUrl} />
              </video>
            </div>
          </div>

          <div className="flex flex-col-reverse w-20 ">
            <p className="mx-auto text-sm font-semibold text-gray-500">{shared}</p>
            <button className="bg-gray-100 w-12 h-12 mx-auto my-1 rounded-full">
              <PiShareFatFill className="m-auto" size={25} />
            </button>
            <p className="mx-auto text-sm font-semibold text-gray-500">{bm}</p>
            <button className="bg-gray-100 w-12 h-12 mx-auto my-2 rounded-full">
              <BsFillBookmarkFill className="m-auto" size={22} />
            </button>
            <p className="mx-auto text-sm font-semibold text-gray-500">{comments}</p>
            <Comments reviewId={reviewId} />

            <p className="mx-auto text-sm font-semibold text-gray-500">{like}</p>
            <button className="bg-gray-100 w-12 h-12 mx-auto my-2 rounded-full">
              <AiFillHeart className="m-auto" size={25} />
            </button>

          </div>

        </div>

      </div>




    </div>
  )
}

export default Review