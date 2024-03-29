import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import nopost from '../assets/images/no_post.svg'
import Feed from './Feeds'
import DataContext from '../context/DataContext'
import { FEEDS_URI, FOLLOWER_URL} from '../constants/api_urls'




const Home = () => {
  // get data from useContext
  const { activeUser, allUser } = useContext(DataContext)
  const [isLoading, setIsLoading] = useState(false)
  const [follower, setFollower] = useState([])
  const [MyTweet, setMyTweet] = useState([])

  // get follower list
  const getFollowers = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(FOLLOWER_URL)
      if (response.status >= 200 && response.status <= 299) {
        setFollower(response.data.data)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  // get my tweets
  const getMytweet = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(FEEDS_URI)
      if (response.status >= 200 && response.status <= 299) {
        setMyTweet(response.data.data)
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
  const myTweet = MyTweet.filter(obj => value.includes(obj.user_id));

  // useEffect
  useEffect(() => {
    getFollowers()
    getMytweet()
  }, [])


  // sort array
  const post = [].concat.apply([], myTweet)
  post.sort((a, b) => {
    let nameA = a.createdAt.toUpperCase(); 
    let nameB = b.createdAt.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }).reverse();
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
                      <Link to='/addtweet' className='btn primary-btn'>Write</Link>
                    </div>
                    {
                      post.map((post, index) => (
                        <Feed id={index} postImage={post.postImage} name={post.userName} tweet={post.tweet} created_on={post.createdAt} user_id={post.user_id} tweetId={post._id} key={index} avatar={post.user}/>
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