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
      const res = await axios.get(`http://localhost:3000/api/review?take=${1}&skip=${(pageParam - 1)}`)
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
  console.log(reviews)
  return (
    <main className="mx-auto px-40 gap-4">
      {isLoading ?
        skeletonArray.map((_, i) => (
          <div className="mt-4">
            <Skeleton variant="rounded" animation="wave" width={430} height={600} />
          </div>
        ))
        : reviews?.map((review, i) => {
          if (i === reviews.length - 1) return (
            <div ref={ref}>
              <Review
                username={review.user.username}
                shop={review?.user?.name ?? ""}
                desc={review.description}
                audio="Original Audio"
                reviewId={review.reviewId}
                videoUrl={review.videoUrl}
                userImgUrl={review.user?.imgUrl ?? ""}
                shared={100}
                comments={123}
                like={5232}
                bm={13}
              />
            </div>
          )
          return <Review
          username="Kevin JK"
          shop="BigBallBrand"
          desc="Good quality, definitely buy again!"
          audio="Industry Baby"
          shared={100}
          comments={123}
          like={5232}
          bm={13}
        />
        })}
    </main>
  )
}