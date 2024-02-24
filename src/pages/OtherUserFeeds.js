import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'
import DeleteIocn from '../assets/images/delete.svg'
import Edit from '../assets/images/edit.svg'
import deImg from '../assets/images/user-profile.svg'
import { BASE_URL } from '../constants/api_urls'





const OtherUserFeeds = ({ name, tweet, created_on, user_id, id, tweetId, avatar, postImage }) => {
  const [timeAgo, setTimeAgo] = useState('');
  const { activeUser } = useContext(DataContext)
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
      {/* <li className="flex justify-between gap-x-6 py-4 position-relative" key={id}>

        <div className="flex min-w-0 gap-x-4 profile-img">
          <Link to={`/${user_id}`}>
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={avatar === null ? deImg : `${BASE_URL}/${avatar}`} alt="" />
          </Link>
        </div>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{name}
            {
              activeUser === user_id ?
                <span className='secondary-color'>(You)</span> : ''
            }
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-500">{tweet}</p>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="mt-1 text-xs leading-5 text-gray-500"><time>{timeAgo}</time></p>
        </div>
        <div className='option-icons'>
          {
            activeUser === user_id ?
              <>
                <Link to={`/tweet/edit/${tweetId}`}><img src={Edit} className='edit-icon' /></Link>
                <Link to={`/tweet/delete/${tweetId}`}><img src={DeleteIocn} className='edit-icon' /></Link>
              </> : ''
          }
        </div>
      </li> */}
      <img src={`${BASE_URL}/${postImage}`} className='profile-page-img' />
    </>
  )
}

export default OtherUserFeeds