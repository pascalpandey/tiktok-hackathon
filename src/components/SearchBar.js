"use client";

import Image from "next/image";
import searchSvg from "../../public/search.svg";
import deleteSvg from "../../public/delete.svg";
import { SiTiktok } from "react-icons/si";
import menuSvg from "../../public/menu.svg";
import LoginSignupGeneric from "./loginSignupGeneric";
import LoginSignup from "./loginSignup";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Avatar from "../components/avatar";
import Link from "next/link";
import ProductUploader from "../components/uploader";
import { useState } from "react";

export default function SearchBar() {
  const { data, error } = useQuery({
    queryFn: async () => {
      const data = await axios.get(
        `http://localhost:3000/api/user/login?token=${
          localStorage?.getItem("JWT_TOKEN") ?? ""
        }`
      );
      return data;
    },
    queryKey: ["checkLogIn"],
  });
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="fixed w-screen  h-16 bg-white border-b border-b-slate-200 flex justify-between top-0 overflow-hidden z-10">
      <Link href="/" className="h-full w-[210px] py-2 flex items-center">
        <SiTiktok className="ml-7 mr-2" size={30} />
        <p className="font-bold text-3xl "> Shop</p>
      </Link>
      <div className="h-full w-520 py-2">
        <form className="h-full border-solid border-gray-100 border rounded-full bg-gray-100 flex justify-center items-center focus-within:border-gray-300">
          <input
            className="h-3/5 bg-transparent w-3/4 focus:outline-none ml-4"
            type="text"
            placeholder="TikTok is the best company"
            onInput={(e) => handleSearch(e)}
            value={searchValue}
          ></input>
          <span className="mx-2 border-r-solid border-r border-r-slate-300 h-1/2 px-2">
            {/* Ini buat ngedelete search barnya kalo di pencet */}
            <div onClick={() => setSearchValue("")}>
              <Image src={deleteSvg} alt="del" />
            </div>
          </span>
          <button type="submit">
            <Image src={searchSvg} alt="search" />
          </button>
        </form>
      </div>
      <div className="h-full flex items-center pr-5 w-[260px]">
        {!data || error ? (
          <>
            <LoginSignupGeneric>
              <button
                className="w-32 mx-1 border h-3/5 text-lg p-1 rounded hover:bg-gray-100"
                type="button"
              >
                + Upload
              </button>
            </LoginSignupGeneric>
            <div className="w-32">
              <LoginSignup />
            </div>
          </>
        ) : (
          <div className="ml-12">
            <ProductUploader />
            {/* Ngetes review uploader */}
            {/* <ReviewUploader /> */}
            <div className="relative">
              <Avatar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
