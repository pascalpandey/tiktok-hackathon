import React from 'react'
import Image from 'next/image'
import ShopNavbar from './components/ShopNavbar'
import ReviewMini from './components/ReviewMini'
import { SlLocationPin } from 'react-icons/sl'
import { AiFillStar, AiOutlineStar, AiFillHeart } from 'react-icons/ai'
import ShopItem from '../../components/ShopItem'

const ProductsPage = () => {
    {/* hardcoded values: */ }
    const name = "Nike Adidas Shoe Best Shoe"
    const rating = 4.4
    const fullStar = new Array(Math.floor(rating)).fill(0);
    const noStar = new Array(5 - Math.floor(rating)).fill(0);
    const location = "Singapore, Singapore"
    const price = "429"
    const desc = "lorem loremborder-gray-700 px-5 py-3 text-gray-500 hover:teborder-gray-700 px-5 py-3 text-\
    gray-500 hover:te py-3 text-gray-500 hover:teborder-graborder-gray-700 px-5 py-3 text-gray-500 hover:tey-700 px-5 py-3 text-gray-500 hover:terem lorem lorem"
    const userName = "best shop seller "


    return (
        <div className='w-full '>
            <div className='mx-auto'>
                <ShopNavbar />
                <div className='flex flex-row w-fit mx-auto'>
                    <div className='mr-12 w-320 h-320 border rounded-md'>

                    </div>
                    <div className='w-520 h-620'>

                        <div className='border-b mb-4 pb-1 border-t pt-4'>
                            <p className='font-semibold text-xl'>{name}</p>
                            <div className='flex flex-row'>

                                <div className='flex flex-row mr-1 mt-0.5'>
                                    {fullStar.map((i) =>
                                        <AiFillStar className="mt-1 mr-1" size={15} color="#FE2C55" />
                                    )}
                                    {noStar.map((i) => <AiOutlineStar className='mt-1 mr-1' color="#FE2C55" size={15} />)}
                                    <p className='mt-0.5 ml-0.5 font-light text-sm'>{rating} / 5</p>
                                </div>
                            </div>
                            <p className='font-bold text-2xl my-3'>SGD {price}</p>
                        </div>

                        <p className='font-bold w-fit mb-1'>Details</p>
                        <p className='text-sm'>{desc}</p>

                        <button className='h-8 w-48 bg-ttred text-white rounded-sm mt-5 px-5 flex justify-around items-center'>
                            <AiFillHeart className="mt-1 mr-1" size={20} color="#FFF"/>
                            <p>Add to Wishlist</p>
                        </button>

                        <div className='border-t py-3 mt-4 flex flex-row justify-between'>
                            <div className='flex flex-row'>
                                <Image className='w-20 h-20 border rounded-full my-2' />
                                <div className='my-4 mx-3'>
                                    <a href={`/user/${userName}`}className='text-lg font-bold'>{userName}</a>
                                    <div className='flex flex-row'>
                                        <SlLocationPin className='mt-0.5 mr-1' size={20} />
                                        <p className='font-light'> {location}</p>
                                    </div>
                                </div>
                            </div>
                            <button className='h-7 w-24 bg-ttred text-white rounded-sm mt-5'> Follow</button>

                        </div>
                        <p className='font-bold mb-1 pt-4 pb-1 border-t'>Reviews</p>
                        <div className='flex flex-row flex-wrap mb-4'>
                            <ReviewMini caption="test caption"/>
                            <ReviewMini caption="test caption"/>
                            <ReviewMini caption="test caption"/>
                            <ReviewMini caption="test caption"/>
                            <ReviewMini caption="test caption"/>
                            <ReviewMini caption="test caption"/>
                       
                        </div>

                        <p className='font-bold mb-1 pt-4 pb-1 border-t'>Recommended</p>
                        <div className='flex flex-row flex-wrap '>
                            {/* <div className='w-58 border h-2'></div> */}
                            <ShopItem
                                h={72}
                                w={60}
                                productName="Nike Air Max 100"
                                desc="industry. Lorem Ipsum has been the industry's standard dummy"
                                price="$100.00"
                                location="Singapore"
                                rating={4.6}
                            />
                            <ShopItem
                                h={72}
                                w={60}
                                productName="Nike Air Max 100"
                                desc="industry. Lorem Ipsum has been the industry's standard dummy"
                                price="$100.00"
                                location="Singapore"
                                rating={4.6}
                            />
                            <ShopItem
                                h={72}
                                w={60}
                                productName="Nike Air Max 100"
                                desc="industry. Lorem Ipsum has been the industry's standard dummy"
                                price="$100.00"
                                location="Singapore"
                                rating={4.6}
                            />
                            <ShopItem
                                h={72}
                                w={60}
                                productName="Nike Air Max 100"
                                desc="industry. Lorem Ipsum has been the industry's standard dummy"
                                price="$100.00"
                                location="Singapore"
                                rating={4.6}
                            />
                          

                        </div>

                    </div>

                    <div className='ml-12 w-64 h-80 border-2 border-gray-300 rounded-md'>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductsPage