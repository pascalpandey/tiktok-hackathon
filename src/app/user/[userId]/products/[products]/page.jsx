import React from 'react'
import Image from 'next/image'
import InfiniteScrollingReviews from './components/infiniteScrollingReviews'
import { SlLocationPin } from 'react-icons/sl'
import Link from 'next/link'
import { AiFillStar, AiOutlineStar, AiFillHeart } from 'react-icons/ai'
import { prisma } from '../../../../api/helpers'
import ReviewUploader from '../../../../../components/uploadReview'
import Follow from '../../../components/Follow'
import WishlistButtonText from '../../../../../components/wishlistButtonText'
import LoginSignupGeneric from '../../../../../components/loginSignupGeneric'

const ProductsPage = async ({ params }) => {
  const username = params.userId
  const itemId = params.products
  const user = await prisma.user.findUnique({
    where: {
      username: username
    },
    include: {
      shop: true
    }
  })

  const item = await prisma.item.findUnique({
    where: {
      itemId: Number(itemId)
    },
  })

  const fullStar = new Array(Math.floor(item.rating ?? 0)).fill(0);
  const noStar = new Array(5 - Math.floor(item.rating ?? 0)).fill(0);

  return (
    <div className='w-full'>
      <div className='mx-auto'>

        <div className='flex flex-row w-fit mx-auto h-full'>
          <div className='mr-12 w-320 h-320 border rounded-md relative mt-[49px]'>
            <Image src={item.imageUrl} layout={'fill'} objectFit={'contain'} alt="product image" />
          </div>
          <div className='w-520 mb-36'>
            <div className='flex'>
              <Link href="#Details-tag" className="font-medium hover:text-gray-700 border-gray-700 pr-5 py-3 text-gray-500 ">
                Details
              </Link>
              <Link href="#Reviews-tag" className="font-medium hover:text-gray-700  border-gray-700 text-gray-500 px-5 py-3 ">
                Reviews
              </Link>
            </div>
            <div id="Details-tag" className='border-b mb-4 pb-1 border-t pt-4'>
              <p className='font-semibold text-xl'>{item.name}</p>
              <div className='flex flex-row'>

                <div className='flex flex-row mr-1 mt-0.5'>
                  {fullStar.map((i) =>
                    <AiFillStar className="mt-1 mr-1" size={15} color="#FE2C55" />
                  )}
                  {noStar.map((i) => <AiOutlineStar className='mt-1 mr-1' color="#FE2C55" size={15} />)}
                  <p className='mt-0.5 ml-0.5 font-light text-sm'>{item.rating ? `${item.rating} / 5` : 'No rating'}</p>
                </div>
              </div>
              <p className='font-bold text-2xl my-3'>SGD {item.price}</p>
            </div>

            <p className='font-bold w-fit mb-1'>Details</p>
            <p className='text-sm'>{item.description}</p>
            <LoginSignupGeneric>
            <WishlistButtonText/>
            </LoginSignupGeneric>

            <div id="Reviews-tag" className='border-t py-3 mt-4 flex flex-row justify-between'>
              <div className='flex flex-row'>
                <div className='w-20 h-20 border rounded-full my-2 relative'>
                  <Image
                    className='w-20 h-20 border rounded-full'
                    layout={'fill'}
                    objectFit={'contain'}
                    alt="product image"
                    src={user?.imgUrl ?? ""} />
                </div>
                <div className='my-4 mx-3'>
                  <Link href={`/user/${user.username}`} className='text-lg font-bold'>{user.username}</Link>
                  <div className='flex flex-row'>
                    <SlLocationPin className='mt-0.5 mr-1' size={20} />
                    <p className='font-light'> {user.shop.location ? user.shop.location : "Singapore, Singapore"}</p>
                  </div>
                </div>
              </div>
              {/* <button id="FollowButton" className='h-7 w-24 bg-ttred text-white rounded-sm mt-5'> Follow</button> */}

            </div>
            <div className='flex items-center border-t pt-4 mb-4'>
              <p className='font-bold mr-auto'>Reviews</p>
              <ReviewUploader itemId={itemId} />
            </div>
            <div className='flex flex-row flex-wrap mb-[40px]'>
              <InfiniteScrollingReviews url={`http://localhost:3000/api/item/reviews?itemId=${itemId}`} parentWidth={490} reviewWidth={160} reviewHeight={224} username={username} itemId={itemId} />
            </div>
          </div>
          <div className='ml-12 w-64 h-80 border-2 border-gray-300 rounded-md mt-[49px]'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage