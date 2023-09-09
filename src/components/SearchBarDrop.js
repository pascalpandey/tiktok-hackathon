"use client";

import { Popover, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment } from "react";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import deleteSvg from "../../public/delete.svg";
import searchSvg from "../../public/search.svg";
import { useState } from "react";
import { useUpdateEffect } from "usehooks-ts";

export default function SearhBarDrop() {
  const [searchValue, setSearchValue] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [listRelevant, setListRelevant] = useState();

  const { refetch } = useQuery({
    queryFn: async () => {
      const data = await axios.get(
        `http://localhost:3000/api/search?query=${searchValue}`
      );
      return data.data;
    },
    queryKey: [`checkFollow${searchValue}`],
    onSuccess: (data) => {
      setListRelevant(data);
    },
  });

  useUpdateEffect(() => {
    const timer = setTimeout(async () => {
      refetch();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  // Ni tdi biar kek Linkny (di search dropdownny) ke click dulu sblm dropdownny ilang. [mungkin bs pake useEffect aj kli?]
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Update searchValue tiap ketik
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="h-full w-520 py-2">
      <div className="h-full border-solid border-gray-100 border rounded-full bg-gray-100 flex justify-center items-center focus-within:border-gray-300">
        <input
          className="h-3/5 bg-transparent w-3/4 focus:outline-none ml-4"
          type="text"
          placeholder="Search users or products"
          value={searchValue}
          onInput={(e) => {
            handleSearch(e);
          }}
          onFocus={(e) => {
            setShowDropDown(true);
          }}
          onBlur={async (e) => {
            sleep(150).then(() => setShowDropDown(false));
          }}
        ></input>
        <span className="mx-2 border-r-solid border-r border-r-slate-300 h-1/2 px-2 hover:cursor-pointer">
          <div onClick={() => setSearchValue("")}>
            <Image src={deleteSvg} alt="del" />
          </div>
        </span>
        <span className="hover:cursor-pointer" onClick={() => {}}>
          <Image src={searchSvg} alt="search" />
        </span>
      </div>

      {showDropDown && (
        <div className="fixed h-auto w-[520px] bg-white top-[64px] rounded-lg shadow-[0px_0px_10px_-5px_rgba(0,0,0,0.3)]">
          {searchValue === "" && (
            <h2 className="mt-2 text-[12px] text-gray-400 ml-2 mb-2">
              You may like:{" "}
            </h2>
          )}
          <div className="h-auto w-full flex flex-col">
            {listRelevant?.products?.length ? (
              listRelevant?.products?.map((product) => {
                console.log(product)
                return (
                  <Link
                    className="text-sm flex flex-row hover:bg-gray-100"
                    href={`/user/${product?.shop?.user?.username}/products/${product?.itemId}`}
                  >
                    <div className="h-9 w-8 flex justify-center items-center">
                      <Image
                        src={searchSvg}
                        alt="search"
                        height={12}
                        width={12}
                      />
                    </div>
                    <div className="h-9 w-full flex items-center mx-2 font-medium">
                      {product?.name}
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="h-10 w-full text-gray-400 text-sm flex flex-col justify-center">
                <div className="pl-4">No product matched!</div>
              </div>
            )}
          </div>
          {searchValue !== "" && listRelevant?.users?.length > 0 && (
            <div>
              <h2 className="mt-2 text-[12px] text-gray-400 ml-2 mb-2">
                Accounts
              </h2>
              <div className="h-auto w-full flex flex-col">
                {listRelevant.users.map((user) => {
                  return (
                    <Link
                      className="flex flex-row hover:bg-gray-100"
                      href={`/user/${user.username}`}
                    >
                      <div className="h-[48px] w-[48px] flex justify-center items-center px-2">
                        <Image
                          src={user.imgUrl}
                          height={44}
                          width={40}
                          className="border rounded-full"
                        />
                      </div>
                      <div className="h-[48px] w-full flex flex-col mx-2 justify-center">
                        <div className="text-sm font-medium h-2/5 pb-0">
                          {user.username}
                        </div>
                        <div className="text-[12px] text-gray-400 font-light">
                          {user?.name ?? ""}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
