import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FOLLOWER_URL, FOLLOWING_URI } from '../constants/api_urls'

const Followbtn = ({ myId, followId, activeUser, allUser, status }) => {
    const [follow, setFollow] = useState([])
    const [follower, setFollower] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [found, setFound] = useState()

    useEffect(() => {
        getUser()
    }, [])
    // handel follow
    const handelFollow = async (followerId, followeeId) => {
        try {
            setIsLoading(true)
            const users = await axios.post(`${FOLLOWING_URI}/${followerId}/${followeeId}`)
            if (users.status >= 200 && users.status <= 299) {
                setFollow(users.data.follower.followeeId)
                setIsLoading(false)
                getUser()
                console.log(users)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    // get follow details
    const getUser = async () => {
        try {
            setIsLoading(true)
            const users = await axios.get(FOLLOWER_URL)
            if (users.status >= 200 && users.status <= 299) {
                setFollower(users.data.data)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    // // //filter followers
    const findFollowers = follower.filter(obj => activeUser?.includes(obj.followerId))
    const myFollowers = findFollowers?.map(obj => obj.followeeId)
    const foundFollower = myFollowers.find(element => element === followId);
    return (
        <>
            {
                foundFollower ?
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <div  className='btn secondary-btn'>following</div>
                    </div> :
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <div onClick={() => handelFollow(myId, followId)} className='btn primary-btn'>Follow</div>
                    </div>
            }
        </>
    )
}

export default Followbtn