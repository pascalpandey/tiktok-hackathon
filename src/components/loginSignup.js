"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function LoginSignup() {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(true);
  const { register, handleSubmit, watch } = useForm();
  const queryClient = useQueryClient()

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      if (login) {
        return await axios.post("/api/user/login", {
          data,
        });
      } else {
        return await axios.post("/api/user", {
          data,
        });
      }
    },
    onSuccess: (res) => {
      if (login) {
        localStorage.setItem("JWT_TOKEN", res.data);
      }
      toast.success(
        login ? "Successfully logged in!" : "Successfully signed up!"
      );
      queryClient.invalidateQueries(['checkLogIn'])
      setShow(false);
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });

  const handleLogInSignUp = async (data) => {
    mutate(data);
  };

  return (
    <>
      <button
        className="bg-transparent border-solid border h-9 border-ttred px-5 py-1 rounded w-full text-ttred hover:bg-red-200"
        onClick={() => {
          setShow(true);
          setLogin(true);
        }}
      >
        Log in
      </button>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShow(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white p-8 w-96 rounded-md h-[400px] flex flex-col gap-4">
                  <h1 className="text-black text-center text-3xl font-bold mb-4">
                    {login ? "Log in" : "Sign up"}
                  </h1>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(handleLogInSignUp)}
                  >
                    <input
                      type="text"
                      placeholder="Username"
                      className="p-2 bg-gray-200 text-black"
                      {...register("username")}
                    />
                    <input
                      type="text"
                      placeholder="Password"
                      className="p-2 bg-gray-200 text-black mb-4"
                      {...register("password")}
                    />
                    {watch("username") && watch("password") ? (
                      <button
                        className={`bg-[#fe2c55] text-white p-2 font-bold`}
                        type="submit"
                        disabled={
                          !watch("username") || !watch("password") || isLoading
                        }
                      >
                        {isLoading
                          ? "Loading..."
                          : login
                          ? "Log in"
                          : "Sign up"}
                      </button>
                    ) : (
                      <button
                        className={`bg-gray-200 p-2 font-bold text-gray-500`}
                        type="submit"
                        disabled={
                          !watch("username") || !watch("password") || isLoading
                        }
                      >
                        {isLoading
                          ? "Loading..."
                          : login
                          ? "Log in"
                          : "Sign up"}
                      </button>
                    )}
                  </form>
                  {login ? (
                    <div className="mt-auto flex flex-row self-center">
                      <h1 className="mr-2">Don't have account yet?</h1>
                      <h1
                        onClick={() => setLogin(false)}
                        className="text-[#fe2c55] cursor-pointer hover:underline"
                      >
                        Sign up
                      </h1>
                    </div>
                  ) : (
                    <div className="mt-auto flex flex-row self-center">
                      <h1 className="mr-2">Already have account?</h1>
                      <h1
                        onClick={() => setLogin(true)}
                        className="text-[#fe2c55] cursor-pointer hover:underline"
                      >
                        Log in
                      </h1>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
