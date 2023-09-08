"use client"

import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation'


const Follow = ({isFollowed }) => {
    /* { Currently viewed user, MyCurrent User, User's current following (array)} */
    const { mutate, isLoading: followLoading } = useMutation({
        mutationFn: async (data) => {
            return await axios.patch(`http://localhost:3000/api/user/${isFollowed?"un":""}follow`, { data });
        },
    });
    const { data: LoginData, data: LoginError } = useQuery({
        queryFn: async () => {
          const data = await axios.get(`http://localhost:3000/api/user/login?token=${localStorage?.getItem("JWT_TOKEN") ?? ""}`)
          return data
        },
        queryKey: ["checkLogIn"]
    })
    const handleFollow = (userName) => {
        mutate({self:self, target:target});
    }
    const path = usePathname().split('/');
    const self = LoginData?.data?.username;
    const target = path[path.length-1];
  
    return (
        <div className='mt-4 w-44 h-8 transition rounded'>
            {true &&
                <button
                    className={'h-full w-full rounded ' + (isFollowed ? 'bg-gray-100 hover:bg-gray-200' : 'hover:bg-[#e61942] bg-ttred text-white')}
                    onClick={() => handleFollow()}
                >
                    {isFollowed ? "Unfollow" : "Follow"}
                </button>
            }
        </div>
    )
}

export default Follow;







  // const showFollowButton = !(myUser.userName == currUser.userName); /* if currView  == my_user */
    // const [isFollowed, setIsFollowed] = useState(myUser.following.includes(currUser.userName)); /* if current user is in user's current following */

    // const handleFollow = () => {
    //     if (isFollowed) {
    //         //remove myUser from currUser's followers
    //         setCurrUser({
    //             ...currUser,
    //             followers: (
    //                 currUser.followers.filter((fw) => fw != myUser.userName)
    //             )
    //         })

    //         //remove currUser from myUser's following
    //         setMyUser({
    //             ...myUser,
    //             following: (
    //                 currUser.following.filter((fw) => fw != currUser.userName)
    //             )
    //         })
    //     }
    //     else {
    //         //add myUser to currUser's followers
    //         setCurrUser({
    //             ...currUser,
    //             followers: [...currUser.followers, myUser.userName]
    //         })

    //         //add currUser to myUser's following
    //         setMyUser({
    //             ...myUser,
    //             following: [...myUser.following, currUser.userName],
    //         })
    //     }
    // }

    // const toggleFollowButton = () => {
    //     handleFollow();
    //     // console.log("MyUser: ", myUser);
    //     // console.log("CurrUser: ", currUser);
    //     setIsFollowed(!isFollowed);
    // }