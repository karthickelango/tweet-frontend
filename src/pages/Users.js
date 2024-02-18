import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import noUser from '../assets/images/no_user.svg'
import DataContext from '../context/DataContext'
import Followbtn from './Followbtn'
import { BASE_URL } from '../constants/api_urls'
import { USER_LIST } from '../constants/api_urls'
import Follower from './Follower'
import Following from './Following'

const Users = () => {
  const { activeUser, follower, setFollower } = useContext(DataContext)
  const [allUser, setAllUser] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [follow, setFollow] = useState([])

  // useEffect
  useEffect(() => {
    getUser()
    getUserDetails()
    setFollow(localStorage.getItem('id') || null)
  }, [])

  // get user details
  const getUserDetails = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BASE_URL}/${activeUser}`)
      if (response.status >= 200 && response.status <= 299) {
        setUserName(response.data)
        setIsLoading(false)
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
      const users = await axios.get(USER_LIST)
      if (users.status >= 200 && users.status <= 299) {
        setAllUser(users.data.auth)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  //filter user
  const otherUsers = allUser.filter(e => e._id === activeUser);
  otherUsers.forEach(f => allUser.splice(allUser.findIndex(e => e._id === activeUser), 1));
  const findFollowers = follower.filter(obj => activeUser?.includes(obj.followerId))
  const myFollowers = findFollowers?.map(obj => obj.followeeId)
  const value = [myFollowers].flatMap(x => x)
  const myfollow = allUser.filter(obj => !value.includes(obj._id));
  const myfollowing = allUser.filter(obj => value.includes(obj._id));
  return (
    <>
      {
        isLoading ? <Spinner /> :
          <>
            <div className='container' style={{ maxWidth: "600px", margin: "0 auto" }}>
              <Following myfollowing={myfollowing} activeUser={activeUser} noImg={false}/>
              <Follower myfollow={myfollow} activeUser={activeUser} noImg={false}/>
            </div>
          </>
      }
    </>
  )
}

export default Users