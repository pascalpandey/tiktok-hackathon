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
import Uploader from "../components/uploader";
import { useState } from "react";

export default function SearchBar(){
  const { data, error } = useQuery({
    queryFn: async () => {
      const data = await axios.get(
        `http://localhost:3000/api/user/login?token=${localStorage?.getItem("JWT_TOKEN") ?? ""}`
      );
      return data;
    },
    queryKey: ["checkLogIn"],
  });
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  }
    return(
        <div className="fixed w-[calc(100vw-16px)] h-16 bg-white border-b border-b-slate-200 flex justify-between top-0 overflow-hidden z-10">
            <Link href="/" className="h-full w-1/4 py-2 flex items-center">
                <SiTiktok className="ml-7 mr-2" size={30}/> 
                <p className="font-bold text-3xl "> Shop</p>
            </Link>
            <div className="h-full w-520 py-2">
                <div className="h-full border-solid border-gray-100 border rounded-full bg-gray-100 flex justify-center items-center focus-within:border-gray-300">
                    <input className="h-3/5 bg-transparent w-3/4 focus:outline-none ml-4" type="text" placeholder="TikTok is the best company"
                      onInput={(e) => handleSearch(e)} value={searchValue}></input>
                    <span className="mx-2 border-r-solid border-r border-r-slate-300 h-1/2 px-2">
                        {/* Ini buat ngedelete search barnya kalo di pencet */}
                        <div onClick={() => setSearchValue("")}>
                            <Image src={deleteSvg} alt="del"/>
                        </div>
                    </span>
                    <button type="button">
                        <Image src={searchSvg} alt="search"/>
                    </button>
                </div>
                
            </div>
            <div className="h-full w-[250px] flex items-center pr-5">
            {!data || error ? (
              <>
                <LoginSignupGeneric>
                  <Uploader/>
                  </LoginSignupGeneric>
                <div className="w-32">
                <LoginSignup />
              </div>
            </>
            ) : (
            <div>
              <Uploader/>
              <div className="relative w-8">
                <Avatar />
              </div>
            </div>
          )}
        
        {/* <button type="button">
          <Image className="ml-10" src={menuSvg} alt="menu" />
        </button> */}
      </div>

      {/* <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
                <form method="POST" action="#" role="none">
                    <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                </form>
                </div>
            </div> */}
    </div>
  );
}