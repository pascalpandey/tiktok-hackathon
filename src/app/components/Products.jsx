"use client"

import React from "react";
import ShopItem from '../user/components/ShopItem'
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useEffect } from "react"
import { useIntersection } from "@mantine/hooks";
import { Skeleton } from "@mui/material";

export default function Products() {
  const rowAmount = Math.floor((window.innerWidth - 240) / 224)
  const { data, fetchNextPage, isLoading } = useInfiniteQuery(
    ['getItems'],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(`http://localhost:3000/api/item?take=${rowAmount}&skip=${(pageParam - 1) * rowAmount}`)
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
    <div className='px-4 py-3 flex gap-4 flex-wrap'>
      {isLoading ?
        skeletonArray.map((_, i) => (
          <Skeleton variant="rounded" animation="wave" width={224} height={288} />
        ))
        : items?.map((item, i) => {
          if (i === items.length - 1) return (
            <div ref={ref}>
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
            </div>
          )
          return <ShopItem
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
        })}
    </div>
  )
}