import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import noUser from '../assets/images/no_user.svg'
import DataContext from '../context/DataContext'
import Followbtn from './Followbtn'
import { BASE_URL } from '../constants/api_urls'
import { USER_LIST } from '../constants/api_urls'

const Following = ({onUpdateLen}) => {
  const {activeUser, follower, setFollower} = useContext(DataContext)
  const [allUser, setAllUser] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [follow, setFollow] = useState([])

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
  const myfollow = allUser.filter(obj => value.includes(obj._id));

  // useEffect
  useEffect(() => {
    getUser()
    getUserDetails()
    onUpdateLen(myfollow?.length) 
  }, [])
    return (
    <>
      {
        isLoading ? <Spinner /> :
          <>
            <div className='container' style={{ maxWidth: "600px", margin: "0 auto" }}>
              {
                myfollow.length > 0 ?
                  <ul role="list" className="divide-y divide-gray-100">
                    {myfollow?.map((user, index) => (
                      <li className="flex justify-between gap-x-6 py-5" key={index}>
                        <div className="flex min-w-0 gap-x-4">
                          <Link to={`/${user._id}`}>
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                          </Link>                    <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{user.username}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Following</p>
                          </div>
                        </div>
                        <h2>following</h2>
                      </li>
                    ))}
                  </ul>
                  :
                  <div className='text-center'>
                    <img src={noUser} style={{ marginTop: "10%", width: "500px" }} />
                    <h3 className='my-3 title-secondary mb-0'>No users to show</h3>
                    <div className='my-3'>
                      <Link to='/' className='btn secondary-btn'>Back to home</Link>
                    </div>
                  </div>
              }
            </div>
          </>
      }
    </>
  )
}

export default Following