"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import homeSvg from "../../public/home.svg";
import followingSvg from "../../public/following.svg";
import shopSvg from "../../public/shop.svg";
import reviewSvg from "../../public/review.svg";
import liveSvg from "../../public/live.svg";
import heartSvg from "../../public/heart.svg";
import LoginSignup from "../components/loginSignup";
import LoginSignupGeneric from "./loginSignupGeneric";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Navbar() {
  const { data, error } = useQuery({
    queryFn: async () => {
      const data = await axios.get(
        `${process.env.DOMAIN}/api/user/login?token=${
          localStorage?.getItem("JWT_TOKEN") ?? ""
        }`
      );
      return data;
    },
    queryKey: ["checkLogIn"],
  });
  return (
    <div>
      <div className="h-screen w-60 bg-transparent fixed top-16 left-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-start flex-col py-3 border-b border-b-slate-200 text-white">
            <ul className="gap-x-6 text-lg text-black font-bold">
              <li className="py-3 px-3 inline-flex w-full hover:bg-gray-50">
                <span className="w-1/6">
                  <Image src={shopSvg} alt="shop" />
                </span>
                <Link href="/">
                  <div className="pl-2">Shop</div>
                </Link>
              </li>

              <li className="py-3 px-3 inline-flex w-full hover:bg-gray-50">
                <span className="w-1/6">
                  <Image src={reviewSvg} alt="review" />
                </span>
                <Link href="/reviews">
                  <div className="pl-2">Reviews</div>
                </Link>
              </li>
              <LoginSignupGeneric>
                <li className="py-3 px-3 inline-flex w-full hover:bg-gray-50">
                  <span className="w-1/6">
                    <Image src={heartSvg} alt="live" />
                  </span>
                  <div className="pl-2">
                    <Link href="/wishlist">Wishlist</Link>
                  </div>
                </li>
              </LoginSignupGeneric>
            </ul>
          </div>
          {(!data || error) && (
            <div className="py-6 text-md border-b border-b-slate-200">
              <div className="pb-3 text-gray-400 font-light">
                Login to view wishlist, add reviews, buy products, and more!
              </div>
              <LoginSignup />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
