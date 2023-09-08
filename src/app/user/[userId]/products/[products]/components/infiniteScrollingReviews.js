"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useEffect } from "react";
import { useIntersection } from "@mantine/hooks";
import { Skeleton } from "@mui/material";
import Link from "next/link";

export default function InfiniteScrollingReviews({
  parentWidth,
  reviewWidth,
  reviewHeight,
  url,
  username,
  itemId,
}) {
  const rowAmount = Math.floor(parentWidth / reviewWidth);
  const { data, fetchNextPage, isLoading } = useInfiniteQuery(
    [`getReviews${itemId}`],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `${url}&take=${rowAmount}&skip=${(pageParam - 1) * rowAmount}`
      );
      return res;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );

  const lastReviewRef = useRef(null);

  const { ref, entry } = useIntersection({
    root: lastReviewRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  const reviews = data?.pages.flatMap((page) => page.data);
  const skeletonArray = Array.from({ length: 3 });
  console.log(reviews);
  return (
    <main className={`w-[${parentWidth}px] gap-4 flex flex-wrap`}>
      {isLoading
        ? skeletonArray.map((_, i) => (
            <div className="mt-4">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={reviewWidth}
                height={reviewHeight}
              />
            </div>
          ))
        : reviews?.map((review, i) => {
            if (i === reviews.length - 1)
              return (
                <div ref={ref}>
                  <Link
                    href={`/user/${username}/products/${itemId}/${review.reviewId}`}
                  >
                    <div
                      className={`rounded relative`}
                      style={{ width: reviewWidth, height: reviewHeight }}
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
                      <p className="text-light text-sm ml-1 truncate">
                        {review.description}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            return (
              <Link
                href={`/user/${username}/products/${itemId}/${review.reviewId}`}
              >
                <div
                  className={`rounded relative`}
                  style={{ width: reviewWidth, height: reviewHeight }}
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
                  <p className="text-light text-sm ml-1 truncate">
                    {review.description}
                  </p>
                </div>
              </Link>
            );
          })}
      {!isLoading && reviews?.length === 0 && (
        <h1 className="text-gray-400 font-light">
          No reviews yet. Be the first reviewer!
        </h1>
      )}
    </main>
  );
}
