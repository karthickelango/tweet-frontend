import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Home from './Home';
import Users from './Users';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner'
import DataContext from '../context/DataContext';
import ProfileFeeds from './ProfileFeeds';
import { BASE_URL, TWEET_URI, UPLOAD_URI, USER_LIST } from '../constants/api_urls';
import Following from './Following';
import Follower from './Follower';
import UploadImage from './UploadImage';
import deImg from '../assets/images/user-profile.svg'


const Account = () => {
  const { activeUser, follower, userImg } = useContext(DataContext)
  const [userName, setUserName] = useState('')
  const [blog, setBlog] = useState([])
  const [isLoading, setIsLoading] = useState(false)
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
  // //filter user
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
  }, [])
  return (
    <>
      {
        isLoading ? <Spinner /> :
          <div className='container' style={{ maxWidth: "600px", margin: "0 auto" }}>
            <ul role="list" className="divide-y divide-gray-100 profile-page">
              <li className="flex justify-between gap-x-6 pt-5 pb-2">
                <div className="flex min-w-0 gap-x-4">
                  <div className='position-relative profile-img'>
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={userImg[0] === null ? deImg : `${BASE_URL}/${userImg}`} alt="" />
                    <UploadImage activeUser={activeUser} />
                  </div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{userName?.username}</p>
                    <span className="mt-1 text-xs leading-5 text-gray-500 w-100">Post: {my_blog.length} </span>
                    <span className="mt-1 text-xs leading-5 text-gray-500 w-100">Followers: {myfollow.length} </span>
                    <span className="mt-1 text-xs leading-5 text-gray-500 w-100">Following: {myfollowing.length}</span>
                  </div>
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
                            <ProfileFeeds post={post} id={index} name={post.userName} tweet={post.tweet} created_on={post.createdAt} user_id={post.user_id} key={index} userImg={userImg}/>
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
                <Follower myfollow={myfollow} activeUser={activeUser} noImg={true} />
              </div>
              <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                <Following myfollowing={myfollowing} activeUser={activeUser} noImg={true} />
              </div>
            </div>
          </div >
      }
    </>
  )
}

export default Account