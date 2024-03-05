import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { FOLLOWING_URI } from '../constants/api_urls'
import { BASE_URL } from '../constants/api_urls'
import { USER_LIST } from '../constants/api_urls'
import DataContext from '../context/DataContext'



const OtherUsers = ({ id }) => {
  const {activeUser} = useContext(DataContext)
  const [allUser, setAllUser] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [follow, setFollow] = useState([])


  useEffect(() => {
    getUser()
  }, [])

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
  const otherUsers = allUser.filter(e => e._id === id);
  otherUsers.forEach(f => allUser.splice(allUser.findIndex(e => e._id === id), 1));

  // handel follow
  const handelFollow = async (followerId, followeeId) => {
    try {
      setIsLoading(true)
      const users = await axios.post(`${FOLLOWING_URI}/${followerId}/${followeeId}`)
      if (users.status >= 200 && users.status <= 299) {
        setFollow(users.data.follower.followeeId)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <>
      {
        isLoading ? <Spinner /> :
          <div className='container' style={{ maxWidth: "600px", margin: "0 auto" }}>
            <ul role="list" className="divide-y divide-gray-100">
              {allUser?.map((user, index) => (
                <li className="flex justify-between gap-x-6 py-5" key={index}>
                  <div className="flex min-w-0 gap-x-4">
                    <Link to={`/${user._id}`}>
                      <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </Link>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{user.username}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">Following</p>
                    </div>
                  </div>
                  <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div onClick={() => handelFollow(activeUser, user._id)} className='btn primary-btn'>Follow</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
      }
    </>
  )
}

export default OtherUsers