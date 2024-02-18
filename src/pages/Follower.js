import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import noUser from '../assets/images/no_user.svg'
import Followbtn from './Followbtn'

const Follower = ({ myfollow, activeUser, noImg }) => {
  const [isLoading, setIsLoading] = useState(false)

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
                        <Followbtn myId={activeUser} followId={user._id} activeUser={activeUser} />
                      </li>
                    ))}
                  </ul>
                  :
                  <>
                    { noImg &&
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

export default Follower