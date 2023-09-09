"use client"

import React from "react";
import Review from '../user/components/Review'
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useEffect } from "react"
import { useIntersection } from "@mantine/hooks";
import { Skeleton } from "@mui/material";

export default function ReviewPage() {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery(
    ['getReviews'],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(`https://tiktok-hackathon.vercel.app/api/review?take=${1}&skip=${(pageParam - 1)}`)
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
          <div className="mt-4 pr-[65px]" key={i}>
            <div className="h-620 w-590 flex flex-row">
              <div className="h-full w-20">
                <Skeleton variant="circular" animation="wave" width={56} height={56} />
              </div>
              <div className="flex flex-col">
                <Skeleton variant="text" animation="wave" width={160} height={30} />
                <Skeleton className="-mt-1" variant="text" animation="wave" width={90} height={23} />
                <Skeleton className="-mt-1" variant="text" animation="wave" width={120} height={23} />
                <Skeleton className="mt-2" variant="rounded" animation="wave" width={350} height={550} />
              </div>
              <div className="flex flex-col-reverse gap-4 mx-4 pb-4">
                <Skeleton variant="circular" animation="wave" width={56} height={56} />
                <Skeleton variant="circular" animation="wave" width={56} height={56} />
                <Skeleton variant="circular" animation="wave" width={56} height={56} />
                <Skeleton variant="circular" animation="wave" width={56} height={56} />
              </div>

            </div>

          </div>
        ))
        : reviews?.map((review, i) => {
          const shared = Math.floor(Math.random() * 10);
          const like = Math.floor(Math.random() * 10);
          const comments = Math.floor(Math.random() * 10);
          const bm = Math.floor(Math.random() * 10);
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
                shared={shared}
                comments={comments}
                like={like}
                bm={bm}
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
            shared={shared}
            comments={comments}
            like={like}
            bm={bm}
          />
        })}
    </main>
  )
}