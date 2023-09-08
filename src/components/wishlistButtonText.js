"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

export default function WishlistButton({ username, itemId }) {
  const { data: alreadyAdded, isLoading } = useQuery({
    queryFn: async () => {
      const data = await axios.get(
        `http://localhost:3000/api/wishlist/check?username=${username}&itemId=${itemId}`
      );
      return data;
    },
    queryKey: [`addRemoveWishlist${username}${itemId}`],
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      console.log('test')
      if (alreadyAdded) {
        return await axios.patch("http://localhost:3000/api/wishlist/remove", {
          data: { token: localStorage?.getItem("JWT_TOKEN") ?? "", itemId },
        });
      } else {
        return await axios.patch("http://localhost:3000/api/wishlist/add", {
          data: { token: localStorage?.getItem("JWT_TOKEN") ?? "", itemId },
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`addRemoveWishlist${username}${itemId}`]);
    },
  });

  const handleClick = async (e) => {
    e.stopPropagation();
    e.preventDefault()
    mutate();
  };

  return (
    <button
      className="mt-0.5 border-2 border-ttred w-8 h-8 rounded hover:bg-red-50 flex items-center z-10"
      onClick={(e) => {handleClick(e); e.preventDefault(); e.stopPropagation()}}
    >
      {!isLoading && alreadyAdded ? (
        <AiFillHeart className="mx-auto " size={24} color="#FE2C55" />
      ) : (
        <AiOutlineHeart className="mx-auto " size={24} color="#FE2C55" />
      )}
    </button>
  );
}
