import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import nopost from '../assets/images/no_post.svg'
import deImg from '../assets/images/user-profile.svg'
import { BASE_URL } from '../constants/api_urls'




const ProfileFeeds = ({ name, tweet, created_on, user_id, id, userImg, postImage }) => {
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
      {/* <li className="flex justify-between gap-x-6 py-5 position-relative" key={id}>
        <div className="flex min-w-0 gap-x-4 profile-img">
          <Link to={`/${user_id}`}>
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={userImg[0] === null ? deImg : `${BASE_URL}/${userImg}`} alt="" />
          </Link>
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{name}</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">{tweet}</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="mt-1 text-xs leading-5 text-gray-500"><time>{timeAgo}</time></p>
        </div>
      </li> */}
        <img src={`${BASE_URL}/${postImage}`} className='profile-page-img'/>
    </>
  )
}

export default ProfileFeeds