"use client"

import React, { useEffect, useRef } from "react";
import ShopItem from '../user/components/ShopItem'
import SubWishlist from "../user/components/subwishlist";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { useIntersection } from "@mantine/hooks";

export default function WishListProducts() {
  const rowAmount = Math.floor((window.innerWidth - 450) / 224)
  console.log(rowAmount)

  const { data: selfWishlist, isLoading: selfWishListLoading } = useQuery({
    queryFn: async () => {
      const data = await axios.get(`http://localhost:3000/api/wishlist/getSelf?token=${localStorage?.getItem("JWT_TOKEN") ?? ""}`)
      return data.data
    },
    queryKey: ["getSelfWishlist"]
  })

  const { data, fetchNextPage, isLoading } = useInfiniteQuery(
    ['getFriendsWishlist'],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(`http://localhost:3000/api/wishlist?token=${localStorage?.getItem("JWT_TOKEN") ?? ""}&take=${1}&skip=${(pageParam - 1)}&rowAmount=${rowAmount}`)
      return res
    }, {
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
  })

  const lastItemRef = useRef(null)

  const { ref, entry } = useIntersection({
    root: lastItemRef.current,
    threshold: 1
  })

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry])

  const items = data?.pages.flatMap((page) => page.data)
  const skeletonArray = Array.from({ length: rowAmount });

  return (
    <div className="pl-5 w-full mb-5">
      <h2 className='text-2xl w-full border-b font-bold mt-10 pb-3'>Your Wishlist </h2>
      <div className='px-4 py-3 flex gap-2 flex-wrap  '>
        {selfWishListLoading ?
          skeletonArray.map((_, i) => (
            <Skeleton variant="rounded" animation="wave" width={224} height={288} />
          ))
          : selfWishlist?.wishlist?.map((item, i) => (
            <ShopItem
              h={72}
              w={56}
              productName={item.name}
              desc={item.description}
              price={`$${item.price}`}
              location="Singapore"
              rating={item.rating}
              imageUrl={item.imageUrl}
              username={item.shop.user.username}
              itemId={item.itemId}
            />
          ))
        }
      </div>
      {(items?.length || isLoading) &&
        <div className='w-full h-auto mt-12'>
          <h2 className='text-xl border-b text-gray-400 pb-3'>Also checkout your friends' wishlists </h2>
          <div className='px-4 py-3 flex gap-2 flex-wrap'>
          {isLoading ?
            skeletonArray.map((_, i) => (
              <Skeleton variant="rounded" animation="wave" width={224} height={288} />
            ))
            : items?.map((item, i) => {
              if (item.following.length > 0) {
                if (i === items.length - 1) return (
                  <div ref={ref}>
                    <SubWishlist wishlist={item.following[0]} maxLength={rowAmount} />
                  </div>
                )
                return <SubWishlist wishlist={item.following[0]} maxLength={rowAmount} />
              }
            })
          }
          </div>
        </div>
      }
    </div>
  )
}