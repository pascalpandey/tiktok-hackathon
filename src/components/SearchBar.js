import Image from "next/image"
import searchSvg from "../../public/search.svg"
import deleteSvg from "../../public/delete.svg"
import {SiTiktok} from 'react-icons/si'
import menuSvg from "../../public/menu.svg"
import LoginSignup from "./loginSignup"

export default function SearchBar(){
    return(
        <div className="fixed w-screen h-16 bg-white border-b border-b-slate-200 flex justify-between top-0 overflow-hidden z-10">
            <a href="/" className="h-full w-1/4 py-2 flex items-center">
                <SiTiktok className="ml-7 mr-2" size={30}/> 
                <p className="font-semibold text-3xl "> Shop</p>
            </a>
            <div className="h-full w-520 py-2">
                <form className="h-full border-solid border-gray-100 border rounded-full bg-gray-100 flex justify-center items-center focus-within:border-gray-300">
                    <input className="h-3/5 bg-transparent w-3/4 focus:outline-none ml-4" type="text" placeholder="TikTok is the best company"></input>
                    <span className="mx-2 border-r-solid border-r border-r-slate-300 h-1/2 px-2">
                        {/* Ini buat ngedelete search barnya kalo di pencet */}
                        <div>
                            <Image src={deleteSvg} alt="del"/>
                        </div>
                    </span>
                    <button type="submit">
                        <Image src={searchSvg} alt="search"/>
                    </button>
                </form>
                
            </div>
            <div className="h-full w-120 flex items-center pr-5 ">
                <button className="w-32 mx-1 border h-9 text-lg px-1 mr-4 rounded" type="button">+ Upload</button>
                <div className="w-32">
                  <LoginSignup/>
                </div>
                <button type="button">
                    <Image className="ml-3"src={menuSvg} alt="menu"/>
                </button>
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
    )
}