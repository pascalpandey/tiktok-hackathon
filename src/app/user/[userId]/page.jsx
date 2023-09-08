"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'
import { MdOutlineShoppingCart } from 'react-icons/md'
import ShopItem from '../components/ShopItem'
import ReviewMini from './products/[products]/components/ReviewMini'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { Skeleton } from '@mui/material';
import Follow from '../components/Follow';
import SubWishlist from '../components/subwishlist';

const UserPage = () => {
  const [section, setSection] = useState("Videos")
  const setSectionFn = (args) => {
    setSection(args);
  }
  const path = usePathname().split('/');
  const { data, error, isLoading } = useQuery({
    queryFn: async () => {
      const data = await axios.get(`http://localhost:3000/api/user?userName=${path[path.length - 1]}`)
      return data
    },
    queryKey: [""]
  })

  const { data: LoginData, data: LoginError } = useQuery({
    queryFn: async () => {
      const data = await axios.get(`http://localhost:3000/api/user/login?token=${localStorage?.getItem("JWT_TOKEN") ?? ""}`)

      return data
    },
    queryKey: ["checkLogIn"]
  })

  const userName = data?.data.username;
  const name = data?.data.name;
  const isShop = data?.data.shop;
  const followers = data?.data.followers;
  const following = data?.data.following;
  const likes = data?.data.likes;
  const desc = data?.data.bio;
  const reviews = data?.data.reviews;

  // DUMMY DATA FOR FOLLOWING LOGIC ---------------------------------------------------
  const [dummyUser1, setDummyUser1] = useState({
    userName: "noob_master_69",
    followers: ["bebekjk_real"],
    following: [],
  })
  const [dummyUser2, setDummyUser2] = useState({
    userName: "bebekjk_real",
    followers: [],
    following: ["noob_master_69"],
  })
  
  const skeletonArray = Array.from({ length: 5 });


  // DUMMY DATA FOR SHOWING FRIEND WISHLIST ----------------------------------------------
  const dummyItem = (
    <ShopItem productName={"kucing hansohee"}
      w={58}
      h={72}
      username={"bebekjk"}
      itemId={69420}
      imageUrl={""}
      price={69420}
      location="Seoul, Korea"
      rating={5}
    />
  )
  const tmpFollowing = [
    {
      username: "bebekjk",
      wishlists: [dummyItem, dummyItem, dummyItem],
      showWishlists: true,
      imageUrl: ""
    },
    {
      username: "bebekjkaa",
      wishlists: [dummyItem, dummyItem],
      showWishlists: true,
      imageUrl: ""
    },
    {
      username: "test",
      wishlists: [dummyItem],
      showWishlists: false,
      imageUrl: ""
    },
    {
      username: "AndrewDJ",
      wishlists: [],
      showWishlists: true,
      imageUrl: ""
    }
  ];

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
                src={LoginData?.data?.imgUrl ?? ""} />
            </div>}
          <div className='flex mx-6 flex-col'>
            <div className='flex flex-row'>
              <p className='mb-1 text-xl font-bold'>{isLoading ?
                <Skeleton variant='text' animation="wave" height={30} width={120} /> : (error) ? "User Not Found" : userName}</p>
              {isShop && <MdOutlineShoppingCart className="ml-2 mt-1" size={23} />}
            </div>
            <p className='mb-2'>{isLoading?<Skeleton className='-mt-1 -mb-1' animation="wave" variant='text' sx={{fontSize:'4rem'}} height={30} width={70}/>:name}</p>
            
            {LoginData?.data?.username===path[path.length-1]?
            <Link href={`/user/${userName}/editProfile`} 
            className='mt-4 w-44 h-8 transition flex items-center bg-ttred rounded hover:bg-[#e61942]'>
              <p className=' text-white mx-auto'>Edit Profile</p>
            </Link>:
            
            // FOLLOW FOLLOWAN
            <Follow currUser={dummyUser1} myUser={dummyUser2} setCurrUser={setDummyUser1} setMyUser={setDummyUser2}/>
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
            <p className='text-lg font-bold'>{likes ? likes : 0}</p>
            <p className='mx-1 text-gray-500 font-light'>Likes</p>
          </div>
        </div>
        <p className='font-light'>{desc}</p>
      </div>
      <div className='flex flex-row'>
        <button className={`${(section === "Videos") ? "border-b-2 text-gray-700 border-gray-700" : ""} hover:text-gray-700 text-gray-500 px-5 py-3`}
          onClick={() => setSectionFn("Videos")}>Videos</button>
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
      {data?.data?.section === "Videos" && <div className='w-full flex-wrap max-w-full flex flex-row'>
        <ReviewMini caption="Videos sample caption" />
        <ReviewMini caption="Videos sample caption" />
      </div>}
      {data?.data?.shop?.items ? section === "Products" && <div className='w-full flex-wrap max-w-full flex flex-row'>
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
      </div> : section === "Products" && <p className='mt-3 text-2xl text-gray-300'>{`${userName} isn't selling anything right now...`}</p>}
      {data?.data?.reviews ? section === "Reviews" && <div className='w-full flex-wrap max-w-full flex flex-row'>
        <ReviewMini caption="Review sample caption" />
        <ReviewMini caption="Review sample caption" />
        <ReviewMini caption="Review sample caption" />
      </div> : section === "Reviews" && <p className='mt-3 text-2xl text-gray-300'>{`${userName} hasn't reviewed anything yet...`}</p>}

      {section === "Wishlist" && <div className='w-full max-w-full'>
        <div className='w-full flex-wrap max-w-full flex flex-row'>
          <ShopItem productName="Ipad Screen Protector"
            w={58}
            h={72}
            price={125}
            location="singapore, singapore"
            rating={0.5}
            inWishlist={true} />
          <ShopItem productName="Ipad Air 5 Case"
            w={58}
            h={72}
            price={10}
            location="singapore, singapore"
            rating={4.8}
            inWishlist={true} />
        </div>

        {/* BAGIAN SHOW WISHLIST KE TEMEN TEMEN */}
        { tmpFollowing.length && 
          <div className='w-full h-auto mt-12'>
            <h2 className='text-lg border-b font-bold'>Also checkout your friends's Wishlists: </h2>
            {
              tmpFollowing.filter((fw) => {
                return fw.showWishlists && fw.wishlists.length > 0
              }).map((fw) => {
                return <SubWishlist user={fw}/>
              })
            }
          </div>
        }
        
      </div>}
    </div>
  )
}

export default UserPage