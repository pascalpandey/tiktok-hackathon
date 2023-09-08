import Image from 'next/image'
const CommentItem = ({comment}) => {
    return(
        <div className="flex flex-row my-2">
            <div className="w-12 h-auto px-2 mb-6">
                <div className='w-[36px] h-[28px] flex justify-center '>
                    <div className='w-[38px] h-[38px] absolute border rounded-full'>
                        <Image src={comment?.imgUrl} fill={true}/>
                    </div>
                </div>
            </div>
            <div className='ml-1'>
                <div className='font-semibold text-sm'>{comment?.username}</div>
                <div className='mt-0.5 text-[13px] font-light mb-2'>{comment?.comment}</div>
            </div>
            
        </div>
    )
}

export default CommentItem;