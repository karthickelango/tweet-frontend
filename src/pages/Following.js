import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import noUser from '../assets/images/no_user.svg'
import { BASE_URL, FOLLOWING_URI } from '../constants/api_urls'
import axios from 'axios'
import deImg from '../assets/images/user-profile.svg'


const Following = ({ myfollowing, activeUser, noImg, follower }) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handelFollow = async (id) => {
    try {
      setIsLoading(true)
      const response = await axios.delete(`${FOLLOWING_URI}/${id}`)
      if (response.status >= 200 && response.status <= 299) {
        navigate('/')
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const findFoll = myfollowing.map(obj => obj.followerList.filter(obj => activeUser?.includes(obj.followerId)))
  // console.log(findFoll)


  // console.log(findFoll)

  return (
    <>
      {
        isLoading ? <Spinner /> :
          <>
            <div className='container' style={{ maxWidth: "600px", margin: "0 auto" }}>
              {
                myfollowing.length > 0 ?
                  <ul role="list" className="divide-y divide-gray-100">
                    {myfollowing?.map((user, index) => (
                      <li className="flex justify-between gap-x-6 py-5" key={index}>
                        <div className="flex min-w-0 gap-x-4 profile-img">
                          <Link to={`/${user._id}`}>
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={user.avatar === null ? deImg : `${BASE_URL}/${user.avatar}`} alt="" />
                          </Link>                    <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{user.username}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Following</p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <div className='btn secondary-btn'>following</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  :
                  <>
                    {
                      noImg &&
                      <div className='text-center'>
                        <img src={noUser} style={{ marginTop: "10%", width: "500px" }} />
                        <h3 className='my-3 title-secondary mb-0'>No users to show</h3>
                        <div className='my-3'>
                          <Link to='/' className='btn secondary-btn'>Back to home</Link>
                        </div>
                      </div>
                    }
                  </>
              }
            </div>
          </>
      }
    </>
  )
}

export default Following