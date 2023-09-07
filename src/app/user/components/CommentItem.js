import Image from 'next/image'
const CommentItem = ({comment}) => {
    return(
        <div className="flex flex-row my-2">
            <div className="w-12 h-auto px-2 mb-6">
                <div className='w-[36px] h-[28px] flex justify-center items-center'>
                    <div className='w-[24px] h-[24px] absolute border border-black rounded-full'>
                        <Image src={comment.profileUrl} fill={true}/>
                    </div>
                </div>
            </div>
            <div className='text-[10px]'>
                <div className='font-bold'>{comment.username}</div>
                <div className=''>{comment.commentDesc}</div>
            </div>
            
        </div>
    )
}

export default CommentItem;