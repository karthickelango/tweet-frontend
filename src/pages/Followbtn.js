import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Followbtn = ({ myId, followId, activeUser}) => {
    const [follow, setFollow] = useState([])
    const [follower, setFollower] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [found, setFound] = useState()

    useEffect(() => {
        getUser()
    }, [followId])
    // handel follow
    const handelFollow = async (followerId, followeeId) => {
        try {
            setIsLoading(true)
            const users = await axios.post(`http://localhost:3001/follow/${followerId}/${followeeId}`)
            if (users.status >= 200 && users.status <= 299) {
                setFollow(users.data.follower.followeeId)
                localStorage.setItem('id', users.data.follower.followeeId)
                setIsLoading(false)
                console.log(users)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    // get user details
    const getUser = async () => {
        try {
            setIsLoading(true)
            const users = await axios.get('http://localhost:3001/follower')
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
                foundFollower ? <h2>following</h2> :
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <div onClick={() => handelFollow(myId, followId)} className='btn primary-btn'>Follow</div>
                    </div>
            }
        </>
    )
}

export default Followbtn