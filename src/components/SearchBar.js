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
import SearchBarDrop from "../components/SearchBarDrop";
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
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const searchItem = (e) => {
    e.preventDefault();
  };
  return (
    <div className="fixed w-screen  h-16 bg-white border-b border-b-slate-200 flex justify-between top-0 overflow-hidden z-20">
      <Link href="/" className="h-full w-[260px] py-2 flex items-center">
        <SiTiktok className="ml-7 mr-2" size={30} />
        <p className="font-bold text-3xl "> Shop</p>
      </Link>

      <SearchBarDrop />
      <div className="h-full flex items-center pr-5 w-[260px]">
        {!data || error ? (
          <>
            <LoginSignupGeneric>
              <button
                className="w-28 mx-1 border h-3/5 text-lg p-1 rounded hover:bg-gray-100"
                type="button"
              >
                + Upload
              </button>
            </LoginSignupGeneric>
            <div className=" ml-2 w-28">
              <LoginSignup />
            </div>
          </>
        ) : (
          <div className="ml-12">
            <ProductUploader />
            <div className="relative">
              <Avatar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
