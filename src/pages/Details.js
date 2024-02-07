import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Home from './Home';
import Users from './Users';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner'
import OtherUsers from './OtherUsers';
import ProfileFeeds from './ProfileFeeds';
import DataContext from '../context/DataContext';
import { BASE_URL, TWEET_URI } from '../constants/api_urls';

const Account = () => {
  const {activeUser} = useContext(DataContext)
  const [blog, setBlog] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [tweet, setTweet] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getBlogs()
    getTweet()
  }, [id])
  
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
  const getTweet= async () => {
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

  const my_blog = tweet.filter((x) => x.user_id.includes(id))

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
                    <p className="text-sm font-semibold leading-6 text-gray-900">{blog.username}</p>
                    <span className="mt-1 text-xs leading-5 text-gray-500 w-100">Post: {my_blog.length}</span>
                    <span className="mt-1 text-xs leading-5 text-gray-500 w-100">Followers: </span>
                    <span className="mt-1 text-xs leading-5 text-gray-500 w-100">Following: </span>
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
                    <ProfileFeeds id={index} name={post.userName} tweet={post.tweet} created_on={post.createdAt} user_id={post.user_id} />
                  ))
                }
                </ul>
              </div>
              <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <OtherUsers id={id}/>
              </div>
              <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                <OtherUsers id={id}/>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Account