"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'
import { MdOutlineShoppingCart } from 'react-icons/md'
import ShopItem from '../components/ShopItem'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { Skeleton } from '@mui/material';
import Follow from '../components/Follow';
import LoginSignupGeneric from '../../../components/loginSignupGeneric'

const UserPage = () => {
  const [section, setSection] = useState("Products")
  const setSectionFn = (args) => {
    setSection(args);
  }
  const path = usePathname().split('/');
  
  const { data, error, isLoading } = useQuery({
    queryFn: async () => {
      const data = await axios.get(`https://tiktok-hackathon.vercel.app/api/user?userName=${path[path.length - 1].replace("%20", " ")}`)
      return data
    },
    queryKey: ["checkFollow"]
  })

  const { data: productData, error: productError, isLoading: productLoad } = useQuery({
    queryFn: async () => {
      const data = await axios.get(`https://tiktok-hackathon.vercel.app/api/user/products?userName=${path[path.length - 1].replace("%20", " ")}`)
      return data
    },
    queryKey: ["productKey"]
  })


  const { data: LoginData, data: LoginError } = useQuery({
    queryFn: async () => {
      const data = await axios.get(`https://tiktok-hackathon.vercel.app/api/user/login?token=${localStorage?.getItem("JWT_TOKEN") ?? ""}`)

      return data
    },
    queryKey: ["checkLogIn"]
  })

  const userName = data?.data?.username;
  const name = data?.data?.name;
  const isShop = data?.data?.shop;
  const followers = data?.data?.followers;
  const following = data?.data?.following;
  const desc = data?.data?.bio;
  const reviews = data?.data?.reviews;
  const skeletonArray = Array.from({ length: 5 });
  const wishlist = data?.data?.wishlist
  const isFollowing = followers?.some(obj => obj.username === LoginData?.data.username)

  return (
    <div className='p-9 w-full'>
      <div className='w-590 h-fit flex flex-col mb-14'>
        <div className='flex flex-row'>
          {isLoading ? <Skeleton variant="circular" animation="wave" width={110} height={110} /> :
            <div className='w-28 h-28 rounded-full relative'>
              <Image className='w-28 h-28 rounded-full'
                layout={'fill'}
                objectFit={'contain'}
                alt="profile image"
                src={data?.data?.imgUrl ?? ""} />
            </div>}
          <div className='flex mx-6 flex-col'>
            <div className='flex flex-row'>
              <p className='mb-1 text-xl font-bold'>{isLoading ?
                <Skeleton variant='text' animation="wave" height={30} width={120} /> : (error) ? "User Not Found" : userName}</p>
              {isShop && <MdOutlineShoppingCart className="ml-2 mt-1" size={23} />}
            </div>
            <p className='mb-2'>{isLoading ? <Skeleton className='-mt-1 -mb-1' animation="wave" variant='text' sx={{ fontSize: '4rem' }} height={30} width={70} /> : name}</p>

            {LoginData?.data?.username === path[path.length - 1].replace("%20", " ") ?
              <Link href={`/user/${userName}/editProfile`}
                className='mt-4 w-44 h-8 transition flex items-center bg-ttred rounded hover:bg-[#e61942]'>
                <p className=' text-white mx-auto'>Edit Profile</p>
              </Link> :

              // FOLLOW FOLLOWAN
              <LoginSignupGeneric>
                <Follow isFollowed={isFollowing} />
              </LoginSignupGeneric>

            }
          </div>
        </div>
        <div className='flex flex-row mt-5 mb-2'>
          <div className='flex flex-row items-baseline'>
            <p className='text-lg font-bold'>{following ? following.length : 0}</p>
            <p className='mx-1 mr-5 text-gray-500 font-light'>Following</p>
          </div>
          <div className='flex flex-row items-baseline'>
            <p className='text-lg font-bold'>{followers ? followers.length : 0}</p>
            <p className='mx-1 mr-5 text-gray-500 font-light'>Followers</p>
          </div>
          <div className='flex flex-row items-baseline'>
            <p className='text-lg font-bold'>{wishlist ? wishlist.length : 0}</p>
            <p className='mx-1 text-gray-500 font-light'>Wishes</p>
          </div>
        </div>
        <p className='font-light'>{desc}</p>
      </div>
      <div className='flex flex-row'>
        <button className={`${(section === "Products") ? "border-b-2 text-gray-700 border-gray-700" : ""} hover:text-gray-700 text-gray-500 px-5 py-3`}
          onClick={() => setSectionFn("Products")}
        >Products</button>
        <button className={`${(section === "Reviews") ? "border-b-2 text-gray-700 border-gray-700" : ""} hover:text-gray-700 text-gray-500 px-5 py-3`}
          onClick={() => setSectionFn("Reviews")}
        >Reviews</button>
        <button className={`${(section === "Wishlist") ? "border-b-2 text-gray-700 border-gray-700" : ""} hover:text-gray-700 text-gray-500 px-5 py-3`}
          onClick={() => setSectionFn("Wishlist")}
        >Wishlist</button>

      </div>
      <div className='border-b max-w-full w-full mb-1'></div>
      {productLoad ? section === "Products" && <div className='py-3 flex gap-4 flex-wrap'>{
        skeletonArray.map((_, i) => (
          <Skeleton variant="rounded" animation="wave" width={224} height={288} key={i}/>
        ))
      }</div>
        : productData?.data?.shop?.items ? section === "Products" &&
          <div className='w-full flex-wrap max-w-full flex gap-4 pt-3 flex-row'>
            {productData?.data?.shop?.items.map((item, i) =>
              <ShopItem productName={item.name}
                w={58}
                h={72}
                username={userName}
                itemId={item.itemId}
                imageUrl={item.imageUrl}
                price={item.price}
                location="singapore, singapore"
                rating={item.rating}
                key={i}
              />)}
          </div> : section === "Products" && <p className='mt-3 text-2xl text-gray-300'>{`${userName} isn't selling anything right now...`}</p>}
      {reviews?.length > 0 ? section === "Reviews" && <div className='w-full flex-wrap max-w-full flex flex-row pt-3 gap-4'>
        {reviews?.map((review, i) => {
          return <Link
            key={i}
            href={`/user/${userName}/products/${review.itemId}/${review.reviewId}`}
          >
            <div
              className={`rounded relative w-58 h-72 border`}
              key={i}
            >
              <video
                autoPlay
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              >
                <source src={review.videoUrl} />
              </video>
              <p className="text-md font-medium ml-1 truncate pt-2">
                {review.description}
              </p>
            </div>
          </Link>
        })}
      </div> : section === "Reviews" && <p className='mt-3 text-2xl text-gray-300'>{`${userName} hasn't reviewed anything yet...`}</p>}

      {wishlist?.length > 0 ? section === "Wishlist" && <div className='w-full flex-wrap max-w-full flex flex-row pt-3 gap-4'>
        {wishlist.map((item, i) => {
          return <ShopItem productName={item.name} key={i}
            w={58}
            h={72}
            username={item.shop.user.username}
            itemId={item.itemId}
            imageUrl={item.imageUrl}
            price={item.price}
            location="singapore, singapore"
            rating={item.rating}
          />
        })}
      </div> : section === "Wishlist" && <p className='mt-3 text-2xl text-gray-300'>{`${userName} doesn't have anything on their wishlist right now...`}</p>}
    </div>
  )
}

export default UserPage