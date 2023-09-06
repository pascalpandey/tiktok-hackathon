import Image from "next/image"
import Link from "next/link";
import { PiShareFatFill } from 'react-icons/pi';
import { AiFillHeart } from 'react-icons/ai';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { FaCommentDots, FaItunesNote} from 'react-icons/fa';

const PageFeed = ({ username, name, desc, audio, like, bm, comments, shared }) => {
  return (

    <div className="flex h-620 w-620 border-b pb-4 mt-6 mx-auto">
      <div className="h-full w-20">
        <Image className="rounded-full w-14 h-14"></Image>
      </div>

      <div className="flex flex-col w-full">
        <div className="relative flex flex-row h-fit w-full">
          <div className="flex flex-col">

            <div className="flex items-baseline">
              <a href={`/user/${username}`} className="font-semibold mx-1">{username}</a>
              <p className="font-light text-sm mx-1">{name}</p>
            </div>

            <div className="max-w-sm">
              <p className="text-base font-light mx-1">{desc}</p>
            </div>
            <div className="flex flex-row ">
              
            <FaItunesNote className="mt-2 mr-1" size={14}/>
            <p className="text-sm font-light mx-1 my-1">{audio}</p>
            </div>

          </div>

          <button className="absolute w-24 h-8 border-ttred hover:bg-red-100 border right-0 my-1 text-ttred rounded-sm">Follow</button>
        </div>

        <div className="flex flex-row w-full h-full">
          <div className="h-full w-80 border mx-1 rounded-lg">
            {/* insert image tiktok content link */}
          </div>
          <div className="flex flex-col-reverse w-20 ">
            <p className="mx-auto text-sm font-semibold text-gray-500">{shared}</p>
            <button className="bg-gray-100 w-12 h-12 mx-auto my-1 rounded-full">
              <PiShareFatFill className="m-auto" size={25} />
            </button>
            <p className="mx-auto text-sm font-semibold text-gray-500">{bm}</p>
            <button className="bg-gray-100 w-12 h-12 mx-auto my-2 rounded-full">
              <BsFillBookmarkFill className="m-auto" size={22} />
            </button>
            <p className="mx-auto text-sm font-semibold text-gray-500">{comments}</p>
            <button className="bg-gray-100 w-12 h-12 mx-auto my-2 rounded-full">
              <FaCommentDots className="m-auto" size={22} />
            </button>
            <p className="mx-auto text-sm font-semibold text-gray-500">{like}</p>
            <button className="bg-gray-100 w-12 h-12 mx-auto my-2 rounded-full">
              <AiFillHeart className="m-auto" size={25} />
            </button>

          </div>

        </div>

      </div>




    </div>
  )
}

export default PageFeed