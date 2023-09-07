"use client"

import { FaCommentDots } from 'react-icons/fa';
import { useState } from 'react';
import CommentItem from './CommentItem';

const commentDummy = {
    username: 'BebekJK',
    profileUrl: '',
    commentDesc: 'ni ai wo wo ai ni mixue bing chilin tian mi mi i love you you love me mixue ice cream and tea',
}

const commentDummy2 = {
    username: 'AndrewDJ',
    profileUrl: '',
    commentDesc: 'Halo Kevin, kok kamu jelek banget sih? Kamu belom mandi ya?'
}

const commentDummy3 = {
    username: 'Lorem_God_69420',
    profileUrl: '',
    commentDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
}

const Comments = () => {
    const [ showComment, setShowComment ] = useState(false);
    const [ commentDesc, setCommentDesc ] = useState("");
    const [ commentList, setCommentList ] = useState([commentDummy, commentDummy2, commentDummy3]);

    const handleSubmit = () => {
        //backend logic
        const newComment = {
            username: 'Jaxton Doe',
            profileUrl: '',
            commentDesc: commentDesc,
        }
        setCommentList([...commentList, newComment]);
        setCommentDesc("");
    }
    return(
        <div className='w-12 h-12 mx-auto my-2'>
            <button className={"bg-gray-100 w-12 h-12 rounded-full hover:bg-ttred " + (showComment && "bg-ttred")}
                onClick={() => setShowComment(!showComment)}>
                <FaCommentDots className="m-auto" size={22} />
            </button> 

            {
                showComment && 
                <div className='w-[0px] h-[0px]'>
                    <div className='relative bg-black w-[345px] h-[525px] right-[366px] bottom-[338px] rounded opacity-20'
                        onClick={() => setShowComment(false)}>
                    </div>
                    <div className='relative bg-white w-[345px] h-[360px] right-[366px] bottom-[698px] rounded-md shadow-[0px_-10px_15px_-10px_rgba(0,0,0,0.3)] overflow-y-scroll px-2 pb-6'>
                        <h2 className='text-center text-sm border-b py-1'>Comments</h2>
                        {
                            commentList.map((commentItem) => {
                                return (
                                    <CommentItem comment={commentItem}/>
                                )
                            })
                        }
                    </div>
                    <div className='relative w-[345px] h-[40px] right-[366px] bottom-[738px] bg-white border-t rounded-s flex items-center px-2 shadow-[0px_-5px_15px_-10px_rgba(0,0,0,0.3)]'>
                        <input className='w-5/6 mx-2 focus:outline-none text-[10px]' placeholder='Add comment' value={commentDesc}
                            onInput={(e) => {setCommentDesc(e.target.value)}}></input>
                        <button className='mx-auto bg-ttred text-white w-[24px] rounded-full hover:bg-rose-600' disabled={!commentDesc}
                            onClick={() => {handleSubmit()}}>{'>'}</button>
                    </div>
                </div>
            }

                
        </div>
        
    )
}
export default Comments;