import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Home from './Home';
import Users from './Users';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner'
import DataContext from '../context/DataContext';
import ProfileFeeds from './ProfileFeeds';
import { BASE_URL, TWEET_URI, USER_LIST } from '../constants/api_urls';
import Following from './Following';
import Follower from './Follower';


const Account = () => {
  const { activeUser, follower } = useContext(DataContext)
  const [userName, setUserName] = useState('')
  const [blog, setBlog] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [followercount, setFollowerCount] = useState(0)
  const [followingcount, setFollowingCount] = useState(0)
  const [allUser, setAllUser] = useState([])

  // get user detail
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

  // get tewwt
  const getTweet = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(TWEET_URI)
      if (response.status >= 200 && response.status <= 299) {
        setBlog(response.data.data)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  const followerLength = (newLength) => {
    setFollowerCount(newLength);
  };
  const followingLength = (newLength) => {
    setFollowingCount(newLength);

  };

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
  //filter user tweet list
  const my_blog = blog.filter((x) => x.user_id.includes(activeUser))
  useEffect(() => {
    getUserDetails()
    getTweet()
    getUser()
    followingLength()
    followerLength()
  }, [])
  return (
    <>
      {
        isLoading ? <Spinner /> :
          <div className='container' style={{ maxWidth: "600px", margin: "0 auto" }}>
            <ul role="list" className="divide-y divide-gray-100 profile-page">
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{userName?.username}</p>
                    <span className="mt-1 text-xs leading-5 text-gray-500 w-100">Post: {my_blog.length} </span>
                    <span className="mt-1 text-xs leading-5 text-gray-500 w-100">Followers: {myfollow.length} </span>
                    <span className="mt-1 text-xs leading-5 text-gray-500 w-100">Following: {myfollowing.length}</span>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                </div>
              </li>
            </ul>
            <ul className="nav nav-pills mb-3 jc-sb bt-1" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="tabnav active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Post</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="tabnav" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Followers</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="tabnav" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Following</button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <ul role="list" className="divide-y divide-gray-100">
                  {
                    my_blog.length > 0 ?
                      <>
                        {
                          my_blog.map((post, index) => (
                            <ProfileFeeds post={post} id={index} name={post.userName} tweet={post.tweet} created_on={post.createdAt} user_id={post.user_id} />
                          ))
                        }
                      </> :
                      <div className='text-center'>
                        <h3 className='my-3 title-secondary mb-0'>No tweet to show</h3>
                      </div>
                  }
                </ul>
              </div>
              <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <Follower myfollow={myfollow} activeUser={activeUser}/>
              </div>
              <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                <Following myfollowing={myfollowing} activeUser={activeUser}/>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Account