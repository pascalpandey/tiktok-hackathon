"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { useState, useContext } from "react";
import { Context } from "./disableProgressBarContext";
import { toast } from "react-hot-toast";

export default function WishlistButtonText({ itemId }) {
  const queryClient = useQueryClient();
  const [added, setAdded] = useState(false);
  const [hideBar, setHideBar] = useContext(Context);

  const { data: alreadyAdded, isLoading } = useQuery({
    queryFn: async () => {
      const data = await axios.get(
        `http://localhost:3000/api/wishlist/check?token=${
          localStorage?.getItem("JWT_TOKEN") ?? ""
        }&itemId=${itemId}`
      );
      return data.data;
    },
    onSuccess: (res) => {
      setAdded(res);
    },
    queryKey: [
      `addRemoveWishlist${itemId}${
        localStorage?.getItem("JWT_TOKEN") ?? ""
      }Query`,
    ],
  });

  const { mutate } = useMutation({
    mutationKey: [
      `addRemoveWishlist${itemId}${
        localStorage?.getItem("JWT_TOKEN") ?? ""
      }Mutation`,
    ],
    mutationFn: async () => {
      if (alreadyAdded) {
        return await axios.patch("http://localhost:3000/api/wishlist/remove", {
          data: {
            token: localStorage?.getItem("JWT_TOKEN") ?? "",
            itemId: itemId,
          },
        });
      } else {
        return await axios.patch("http://localhost:3000/api/wishlist/add", {
          data: {
            token: localStorage?.getItem("JWT_TOKEN") ?? "",
            itemId: itemId,
          },
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`addRemoveWishlist${itemId}`]);
    },
  });

  const handleClick = (e) => {
    setHideBar(true);
    setAdded(!added);
    mutate();
    if (!added) {
      toast.success("Successfully added to Wishlist!");
    } else {
      toast.success("Successfully removed from Wishlist!");
    }
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <button
      className="h-8 w-48 bg-ttred text-white rounded-sm mt-5 px-5 flex justify-around items-center"
      onClick={(e) => {
        handleClick(e);
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <AiFillHeart className="mt-0.5 mr-1" size={20} color="#FFF" />
      {added ? <p>Remove from Wishlist</p> : <p>Add to Wishlist</p>}
    </button>
  );
}
