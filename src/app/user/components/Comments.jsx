"use client"

import { FaCommentDots } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import CommentItem from './CommentItem';
import axios from 'axios';
import LoginSignupGeneric from '../../../components/loginSignupGeneric';


const Comments = ({ reviewId }) => {
    const [showComment, setShowComment] = useState(false);
    const [commentDesc, setCommentDesc] = useState("");
    const [commentList, setCommentList] = useState([]);
    console.log("REVIEW", reviewId)
    const clientUpdate = (userData) => {
        const serverComment = {
            reviewId: reviewId,
            userId: userData?.data?.userId,
            username: userData?.data?.username,
            comment: commentDesc,
        }
        const clientComment = {
            comment: commentDesc,
            user: {
                imgUrl: userData?.data?.imgUrl,
                username: userData?.data?.username,
            }
        }
        console.log(clientComment);
        mutate(serverComment);
        setCommentList([...commentList, clientComment]);
    }
    const { data: commentData, error } = useQuery({
        queryFn: async () => {
            const data = await axios.get(`http://localhost:3000/api/comments?reviewId=${reviewId}`)
            return data
        },

        queryKey: [`commentKey${reviewId}`]
    })

    useEffect(() => {
        if (commentData) {
            console.log(commentData.data.comments)
            setCommentList(commentData.data.comments);
        }
    }, [commentData]);

    const { data: userData } = useQuery({
        queryFn: async () => {
            const data = await axios.get(`http://localhost:3000/api/user/login?token=${localStorage?.getItem("JWT_TOKEN") ?? ""}`)
            return data;
        },
        queryKey: ["checkLogIn"]
    })
    const { mutate, isLoading } = useMutation({
        mutationFn: async (data) => {
            const res = await axios.post(`http://localhost:3000/api/comments`, { data })
            return res;
        },
        mutationKey: ["mutateKeyComments"]
    })

    return (
        <div className='w-12 h-12 mx-auto my-2'>
            <button className={"bg-gray-100 w-12 h-12 rounded-full hover:bg-gray-300 " + (showComment && "bg-gray-200")}
                onClick={() => setShowComment(!showComment)}>
                <FaCommentDots className="m-auto" size={22} />
            </button>

            {
                showComment &&
                <div className='w-0 h-0'>
                    <div className='relative bg-black w-[345px] h-[525px] right-[366px] bottom-[338px] rounded opacity-10'
                        onClick={() => setShowComment(false)}>
                    </div>
                    <div className='relative bg-white w-[345px] h-[360px] right-[366px] bottom-[698px] rounded-md shadow-[0px_-10px_15px_-10px_rgba(0,0,0,0.3)] overflow-y-scroll px-2 pb-6'>
                        <h2 className='text-center text-sm mt-1.5 border-b pt-1 pb-2'>Comments</h2>
                        {
                            commentList?.map((commentItem, i) => {
                                return (
                                    <CommentItem comment={commentItem} key={i} />
                                )
                            })
                        }
                    </div>

                    <div className='relative w-[345px] h-[40px] right-[366px] bottom-[738px] bg-white border-t rounded-s flex items-center px-2 shadow-[0px_-5px_15px_-10px_rgba(0,0,0,0.3)]'>
                        <input type="text"
                            className='w-full mx-2 focus:outline-none text-sm' placeholder='Add comment' value={commentDesc}
                            onInput={(e) => { setCommentDesc(e.target.value) }}
                        ></input>
                        <LoginSignupGeneric>

                            <button type="submit" className=' bg-ttred rounded p-1 hover:bg-rose-600' disabled={!commentDesc}
                                onClick={() => {
                                    clientUpdate(userData)
                                    setCommentDesc("")
                                }}>
                                <IoSend color="white" size={18} />
                            </button>
                        </LoginSignupGeneric>
                    </div>

                </div>
            }


        </div>

    )
}
export default Comments;