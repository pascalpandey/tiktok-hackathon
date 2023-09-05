import React from "react";
import Link from "next/link";
export default function Navbar(){
    const isLoggedIn = false;

    return (
      <div>
        <div className="h-screen w-1/6 bg-transparent sticky top-0">
          <div className="container mx-auto px-4 h-full">
            <div className="flex justify-between items-start flex-col py-3 border-b-2 border-b-solid border-b-slate-200 text-white">
              {/* <Logo /> */}
              <ul className="gap-x-6 text-lg text-black font-bold">
                <li className="py-3 px-3 inline-flex w-full">
                  <span className="w-1/6">
                    <svg className="w-1/6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  </span>
                  <Link href="/foryou">
                    <p>For You</p>
                  </Link>
                </li>
                <li className="py-3 px-3 inline-flex w-full">
                  <span className="w-1/6">
                      <svg className="w-1/6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                  </span>
                  <Link href="/following">
                    <p>Following</p>
                  </Link>
                </li>
                <li className="py-3 px-3 inline-flex w-full">
                  <span className="w-1/6">
                    <svg className="w-1/6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </span>
                  <Link href="/shop">
                    <p>Shop</p>
                  </Link>
                </li>
                <li className="py-3 px-3 inline-flex w-full">
                  <span className="w-1/6">
                    <svg className="w-1/6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                  </span>
                  <Link href="/reviews">
                    <p>Reviews</p>
                  </Link>
                </li>
                <li className="py-3 px-3 inline-flex w-full">
                  <span className="w-1/6">
                    <svg className="w-1/6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </span>
                  

                  <Link href="/Live">
                    <p>Live</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="py-6 text-md border-b-2 border-b-solid border-b-slate-200">
              <p className="pb-3 text-slate-600 font-thin">Login to view comments and get more personalised shop reviews</p>
              <button className="bg-transparent border-solid border-2 border-red-500 px-5 py-2 rounded-md w-full text-red-500">Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  