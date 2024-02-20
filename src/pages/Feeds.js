import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'
import DeleteIocn from '../assets/images/delete.svg'
import Edit from '../assets/images/edit.svg'
import deImg from '../assets/images/user-profile.svg'
import { BASE_URL } from '../constants/api_urls'
import UserFeeds from './UserFeeds'





const Feed = ({ avatar, post}) => {

  return (
    <>          {
      post.map((post, index) => (
        <UserFeeds id={index} name={post.userName} tweet={post.tweet} created_on={post.createdAt} user_id={post.user_id} tweetId={post._id} key={index} avatar={avatar} />
      ))
    }
    </>
  )
}

export default Feed