"use client";

import { Popover, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment } from "react";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

export default function Avatar() {
  const queryClient = useQueryClient();
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
  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      localStorage.clear("JWT_TOKEN");
      return;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["checkLogIn"]);
      toast.success("Successfully logged out!");
    },
  });

  return (
    <div className="fixed w-full max-w-sm px-4 translate-x-[130px] -translate-y-[40px]">
      <Popover className="relative">
        {() => (
          <>
            <Popover.Button>
              <div className="rounded-full w-10 h-10 relative">
                <Image
                  className="rounded-full w-10 h-10"
                  layout={'fill'} 
                  objectFit={'contain'} 
                  alt="profile image"
                  src={data?.data?.imgUrl ?? ""}
                />
              </div>
            </Popover.Button>
            <Popover.Overlay className="fixed inset-0 backdrop-filter z-10" />
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 -translate-x-[320px] top-auto z-10 mt-3 w-[150px] shadow-lg h-[130px] rounded-md p-4 bg-white">
                <Link href={`/user/${data?.data?.username}`} className="font-semibold">
                  <h1 className="mb-2 text-lg">My Profile</h1>
                </Link>
                <Link
                  href={`/user/${data?.data?.username}/editProfile`}
                  className="font-semibold"
                >
                  <h1 className="mb-2 text-lg">Edit Profile</h1>
                </Link>
                <h1
                  onClick={() => {
                    mutate();
                  }}
                  className="cursor-pointer font-semibold text-lg -translate-y-[3px]"
                >
                  {isLoading ? "Loading..." : "Log out"}
                </h1>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
