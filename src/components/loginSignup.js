"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function LoginSignup() {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(true);
  const { register, handleSubmit, watch } = useForm();

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
        localStorage.setItem("JWT_TOKEN", res.data)
      }
      toast.success(
        login ? "Successfully logged in!" : "Successfully signed up!"
      );
      setShow(false)
    },
    onError: (err) => {
      toast.error(err.response.data)
    },
  });

  const handleLogInSignUp = async (data) => {
    mutate(data);
  };

  return (
    <>
      <button
        className="rounded-md bg-[#fe2c55] text-white font-bold text-lg p-2 w-28"
        onClick={() => {
          setShow(true);
          setLogin(true);
        }}
      >
        Log in
      </button>
      {show && (
        <div className="absolute top-0 left-0 w-screen h-screen">
          <div className="sticky top-0 left-0">
            <div
              className="absolute flex w-screen h-screen top-0 left-0 bg-black opacity-20 -z-10"
              onClick={() => setShow(false)}
            />
            <div className="bg-white p-8 w-96 rounded-md h-[400px] flex flex-col gap-4 z-50 absolute top-[calc((100vh-400px)/2)] left-[calc((100vw-384px)/2)]">
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
                    {isLoading ? 'Loading...' : login ? "Log in" : "Sign up"}
                  </button>
                ) : (
                  <button
                    className={`bg-gray-200 p-2 font-bold text-gray-500`}
                    type="submit"
                    disabled={
                      !watch("username") || !watch("password") || isLoading
                    }
                  >
                    {isLoading ? 'Loading...' : login ? "Log in" : "Sign up"}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
