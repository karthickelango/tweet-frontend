import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TWEET_URI } from '../constants/api_urls'
import DataContext from '../context/DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import CancelBtn from '../components/CancelBtn'

const EditTweet = () => {
    const { activeUser } = useContext(DataContext)
    const [tweet, setTweet] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [userActive, setUserActive] = useState('')
    const userInfo = userActive._id
    const userName = userActive.username
    const { id } = useParams()

    const getInfo = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${TWEET_URI}/${id}`)
            if (response.status >= 200 && response.status <= 299) {
                setTweet(response.data.tweet)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    const handelEditTweet = async () => {
        const data = {
            tweet
        }
        try {
            setIsLoading(true)
            const response = await axios.put(`${TWEET_URI}/${id}`, data)
            if (response.status >= 200 && response.status <= 299) {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getInfo()
    }, [])
    return (
        <div className='container' style={{ maxWidth: "600px", margin: "0 auto" }}>
            {
                isLoading ?
                    <Spinner /> :
                    <>
                        <div className='flex justify-between text-center'>
                            <h1 className='text-3xl my-4'>Write a tweet</h1>
                        </div>
                        <div className='my-4'>
                            <textarea type='text' placeholder='tweet...' value={tweet} onChange={(e) => setTweet(e.target.value)} style={{ height: "150px" }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <button className="btn primary-btn me-3" onClick={() => handelEditTweet()}>
                            Update
                        </button>
                        <CancelBtn />
                    </>
            }
        </div>
    )
}

export default EditTweet