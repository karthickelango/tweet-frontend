import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import nopost from '../assets/images/no_post.svg'
import deImg from '../assets/images/user-profile.svg'
import { BASE_URL } from '../constants/api_urls'
import OtherUserFeeds from './OtherUserFeeds'




const OtherFeeds = ({ created_on, userImg, post, postImage }) => {
  const [timeAgo, setTimeAgo] = useState('');
  useEffect(() => {

    const calculateTimeAgo = () => {
      const now = new Date();
      const postTimestamp = new Date(created_on).getTime();
      const seconds = Math.floor((now - postTimestamp) / 1000);

      // Define time intervals
      const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
      ];

      // Calculate time ago
      for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        const count = Math.floor(seconds / interval.seconds);

        if (count > 0) {
          setTimeAgo(`${count} ${interval.label}${count === 1 ? '' : 's'} ago`);
          return;
        }
      }

      setTimeAgo('Just now');
    };

    calculateTimeAgo();
  }, [])

  return (
    <>
      {
        post.length > 0 ?
          <div className='profile-page'>
            {
              post.map((post, index) => (
                <OtherUserFeeds id={index} name={post.userName} tweet={post.tweet} created_on={post.createdAt} user_id={post.user_id} tweetId={post._id} key={index} avatar={userImg} postImage={post.postImage} />
              ))
            }
          </div>
          :

          <div className='text-center'>
            <h3 className='my-3 title-secondary mb-0'>No tweet to show</h3>
          </div>
      }
    </>
  )
}

export default OtherFeeds