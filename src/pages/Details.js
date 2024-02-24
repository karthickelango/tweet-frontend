import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Home from './Home';
import Users from './Users';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner'
import OtherUsers from './OtherUsers';
import ProfileFeeds from './ProfileFeeds';
import DataContext from '../context/DataContext';
import { BASE_URL, MYTWEET_URI, TWEET_URI, USER_LIST } from '../constants/api_urls';
import OtherFollower from './OtherFollower';
import OtherFollowing from './OtherFollowing';
import OtherFeeds from './OtherFeeds';
import deImg from '../assets/images/user-profile.svg'


const Account = () => {
  const { activeUser, follower } = useContext(DataContext)
  const [blog, setBlog] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [tweet, setTweet] = useState([])
  const { id } = useParams()
  const [followercount, setFollowerCount] = useState(0)
  const [followingcount, setFollowingCount] = useState(0)
  const [allUser, setAllUser] = useState([])
  const [MyTweet, setMyTweet] = useState([])



  const getBlogs = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BASE_URL}/${id}`)
      if (response.status >= 200 && response.status <= 299) {
        setBlog(response.data)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  // get tweet
  const getTweet = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(TWEET_URI)
      if (response.status >= 200 && response.status <= 299) {
        setTweet(response.data.data)
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

  const getMytweet = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(MYTWEET_URI)
      if (response.status >= 200 && response.status <= 299) {
        setMyTweet(response.data.data)
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
  const findFollowers = follower.filter(obj => id?.includes(obj.followerId))
  const myFollowers = findFollowers?.map(obj => obj.followeeId)
  const value = [myFollowers].flatMap(x => x)
  const myfollow = allUser.filter(obj => !value.includes(obj._id));
  const myfollowing = allUser.filter(obj => value.includes(obj._id));
  const my_blog = MyTweet.filter((x) => x._id.includes(id))
  const userImg = my_blog.map(x => x.avatar)
  useEffect(() => {
    getBlogs()
    getTweet()
    getUser()
    getMytweet()
  }, [id])
  return (
    <>
      {
        isLoading ? <Spinner /> :
          <div className='container' style={{ maxWidth: "600px", margin: "0 auto" }}>
            <ul role="list" className="divide-y divide-gray-100 profile-page">
              <li className="flex justify-between gap-x-6 pt-5 pb-2">
                <div className="flex min-w-0 gap-x-4 profile-img">
                  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={userImg[0] === null ? deImg : `${BASE_URL}/${userImg}`} alt="" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{blog.username}</p>
                    <span className="mt-1 text-xs leading-5 text-gray-500 w-100">Post: {my_blog.map(x => x.myTweet.length)}</span>
                    <span className="mt-1 text-xs leading-5 text-gray-500 w-100">Followers: {myfollow.length}</span>
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
                      my_blog.map((post, index) => (
                        <OtherFeeds post={post.myTweet} id={index} name={post.userName} tweet={post.tweet} created_on={post.createdAt} user_id={post.user_id} userImg={post.avatar} postImage={post.postImage} />
                      ))
                    }
                </ul>
              </div>
              <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <OtherFollower myfollow={myfollow} activeUser={activeUser} />
              </div>
              <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                <OtherFollowing myfollowing={myfollowing} activeUser={activeUser} />
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Account