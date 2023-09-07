"use client"

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
      const data = await axios.get(`http://localhost:3000/api/user/login?token=${localStorage?.getItem("JWT_TOKEN") ?? ""}`)
      return data
    },
    queryKey: ["checkLogIn"]
  })
  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      localStorage.clear("JWT_TOKEN");
      return
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["checkLogIn"]);
      toast.success("Successfully logged out!");
    },
  });

  return (
    <div className="fixed w-full max-w-sm px-4 translate-x-[130px] -translate-y-[34px]">
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button>
            <Image className="rounded-full w-8 h-8"></Image>
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
            <Popover.Panel className="absolute right-0 -translate-x-[320px] top-auto z-10 mt-3 w-[150px] shadow-lg rounded-md p-6 bg-white h-[100px]">
              <Link href={`/user/${data?.data}`} className="w-full my-4 font-semibold text-md hover:text-ttred" >Profile</Link>
              <div
                onClick={() => {
                  mutate();
                }}
                className="cursor-pointer font-semibold text-md my-4 hover:text-ttred"
              >
                {isLoading? 'Loading...' : 'Log out'}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
    </div>
  );
}
