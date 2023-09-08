"use client"

import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';


const Follow = ({ isFollowed }) => {
    const [clientValue, setClientValue] = useState(null);
    const { mutate, isLoading: followLoading } = useMutation({
        mutationFn: async (data) => {
            return await axios.patch(`http://localhost:3000/api/user/${isFollowed ? "un" : ""}follow`, { data });
        },
    });
    const { data: LoginData, data: LoginError } = useQuery({
        queryFn: async () => {
            const data = await axios.get(`http://localhost:3000/api/user/login?token=${localStorage?.getItem("JWT_TOKEN") ?? ""}`)
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
        console.log("client: ", clientValue);
        console.log("isFOllowd", isFollowed);
        setClientValue(!clientValue);
    }
    const path = usePathname().split('/');
    const self = LoginData?.data?.username;
    const target = path[path.length - 1];

    return (
        <div className='mt-4 w-44 h-8 transition rounded'>

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






