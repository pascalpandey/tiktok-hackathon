"use client"

import React from "react";
import Review from '../../../components/Review'
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useEffect } from "react"
import { useIntersection } from "@mantine/hooks";
import { Skeleton } from "@mui/material";
import { usePathname } from "next/navigation";

export default function ReviewPage() {
  const path = usePathname().split('/');
  const { data, fetchNextPage, isLoading } = useInfiniteQuery(
    ['getReviews'],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(`${process.env.DOMAIN}/api/review?reviewId=${path[2]}&take=${1}&skip=${(pageParam - 1)}`)
      return res
    }, {
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
  })

  const lastReviewRef = useRef(null)

  const { ref, entry } = useIntersection({
    root: lastReviewRef.current,
    threshold: 1
  })

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry])

  const reviews = data?.pages.flatMap((page) => page.data)
  const skeletonArray = Array.from({ length: 1 });

  return (
    <main className="mx-auto pr-[170px] gap-4">
      {isLoading ?
        skeletonArray.map((_, i) => (
          <div className="mt-4 pr-[65px]"  key={i}>
            <Skeleton variant="rounded" animation="wave" width={350} height={600}  />
          </div>
        ))
        : reviews?.map((review, i) => {
          if (i === reviews.length - 1) return (
            <div ref={ref}  key={i}>
              <Review
                posterUsername={review.user.username}
                shopUsername={review.item.shop.user.username}
                shop={review?.user?.name ?? ""}
                desc={review.description}
                itemName={review.item.name}
                rating={review.rating}
                reviewId={review.reviewId}
                videoUrl={review.videoUrl}
                userImgUrl={review.user?.imgUrl ?? ""}
                itemId={review.item.itemId}
                shared={100}
                comments={123}
                like={5232}
                bm={13}
              />
            </div>
          )
          return <Review
            key={i}
            posterUsername={review.user.username}
            shopUsername={review.item.shop.user.username}
            shop={review?.user?.name ?? ""}
            desc={review.description}
            itemName={review.item.name}
            rating={review.rating}
            reviewId={review.reviewId}
            videoUrl={review.videoUrl}
            userImgUrl={review.user?.imgUrl ?? ""}
            itemId={review.item.itemId}
            shared={100}
            comments={123}
            like={5232}
            bm={13}
          />
        })}
    </main>
  )
}