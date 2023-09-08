"use client"

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const Follow = ({currUser, myUser, setCurrUser, setMyUser} ) => {
    /* { Currently viewed user, MyCurrent User, User's current following (array)} */

    const showFollowButton = !(myUser.userName == currUser.userName); /* if currView  == my_user */
    const [isFollowed, setIsFollowed] = useState(myUser.following.includes(currUser.userName)); /* if current user is in user's current following */

    const handleFollow = () => {
        if(isFollowed){
            //remove myUser from currUser's followers
            setCurrUser({
                ...currUser,
                followers: (
                    currUser.followers.filter((fw) => fw != myUser.userName)
                )
            })

            //remove currUser from myUser's following
            setMyUser({
                ...myUser,
                following: (
                    currUser.following.filter((fw) => fw != currUser.userName)
                )
            })
        }
        else{
            //add myUser to currUser's followers
            setCurrUser({
                ...currUser,
                followers: [...currUser.followers, myUser.userName]
            })

            //add currUser to myUser's following
            setMyUser({
                ...myUser,
                following: [...myUser.following, currUser.userName],
            })
        }
    }

    const toggleFollowButton = () => {
        handleFollow();
        // console.log("MyUser: ", myUser);
        // console.log("CurrUser: ", currUser);
        setIsFollowed(!isFollowed);
    }
    return(
        <div className='mt-4 w-44 h-8 transition rounded'>
            {showFollowButton && 
                <button 
                    className={'h-full w-full rounded ' + (isFollowed? 'bg-gray-100 hover:bg-gray-200':'hover:bg-[#e61942] bg-ttred text-white')}
                    onClick={() => toggleFollowButton()}
                >
                    {isFollowed? "Unfollow" : "Follow"}
                </button>
            }
        </div>
    )
}

export default Follow;