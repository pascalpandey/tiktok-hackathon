"use client"

import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';


const Follow = ({ isFollowed, targetUsername }) => {
  const queryClient = useQueryClient()
    const [clientValue, setClientValue] = useState(null);
    const { mutate, isLoading: followLoading } = useMutation({
        mutationFn: async (data) => {
            return await axios.patch(`https://tiktok-hackathon.vercel.app/api/user/${isFollowed ? "un" : ""}follow`, { data });
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['getFriendsWishlist'])
        }
    });
    const { data: LoginData, data: LoginError } = useQuery({
        queryFn: async () => {
            const data = await axios.get(`https://tiktok-hackathon.vercel.app/api/user/login?token=${localStorage?.getItem("JWT_TOKEN") ?? ""}`)
            return data
        },
        queryKey: ["checkLogIn"]
    })
    useEffect(() => {
        setClientValue(isFollowed);
    }, [isFollowed])
    const handleFollow = (userName) => {
        mutate({ self: self, target: target });
    }
    const clientView = () => {
        setClientValue(!clientValue);
    }
    const path = usePathname().split('/');
    const self = LoginData?.data?.username;
    const target = targetUsername ? targetUsername : path[path.length - 1].replace("%20", " ");

    return (
        <div className='mt-4 w-32 h-8 transition rounded'>

            <button
                className={'h-full w-full rounded ' + (clientValue? 'bg-gray-100 hover:bg-gray-200' : 'hover:bg-[#e61942] bg-ttred text-white')}
                onClick={() => { clientView(); handleFollow(); }}
            >
                {clientValue? "Unfollow" : "Follow"}
            </button>

        </div>
    )
}

export default Follow;






