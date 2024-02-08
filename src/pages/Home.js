import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import nopost from '../assets/images/no_post.svg'
import Feed from './Feeds'
import DataContext from '../context/DataContext'
import { TWEET_URI } from '../constants/api_urls'




const Home = () => {
  // get data from useContext
  const { activeUser, follower, setFollower } = useContext(DataContext)
  const [tweet, setTeeet] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // get tweet list
  const getTweets = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(TWEET_URI)
      if (response.status >= 200 && response.status <= 299) {
        setTeeet(response.data.data)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  //filter followers
  const findFollowers = follower.filter(obj => activeUser?.includes(obj.followerId))
  const myFollowers = findFollowers.map(obj => obj.followeeId)
  //filter post
  const value = [activeUser, myFollowers].flatMap(x => x)
  const myTweet = tweet.filter(obj => value.includes(obj.user_id));
  
  // useEffect
  useEffect(() => {
    getTweets() 
  }, [])

  return (
    <>
      {
        isLoading ? <Spinner /> :
          <div className='container' style={{ maxWidth: "600px", margin: "0 auto" }}>
            <ul role="list" className="divide-y divide-gray-100">
              {
                myTweet?.length > 0 ?
                  <>
                    <div className='text-start my-3'>
                      <Link to='/addtweet' className='btn primary-btn'>write</Link>
                    </div>
                    {
                      myTweet.map((post, index) => (
                        <Feed id={index} name={post.userName} tweet={post.tweet} created_on={post.createdAt} user_id={post.user_id} />
                      ))
                    }
                  </>
                  :
                  <div className='text-center'>
                    <img src={nopost} style={{ marginTop: "10%" }} />
                    <h3 className='my-3 title-secondary mb-0'>No tweet to show, write a tweet</h3>
                    <div className='my-3'>
                      <Link to='/addtweet' className='btn primary-btn'>write</Link>
                    </div>
                  </div>
              }
            </ul>
          </div>
      }
    </>
  )
}

export default Home