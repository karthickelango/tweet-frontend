import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import CancelBtn from '../components/CancelBtn'
import DataContext from '../context/DataContext'
import { BASE_URL, TWEET_URI } from '../constants/api_urls'

const AddTweet = () => {
    const {activeUser} = useContext(DataContext)
    const [tweet, setTweet] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [userActive, setUserActive] = useState('')
    const userInfo = userActive._id
    const userName = userActive.username

    useEffect(() => {
        getUser()
    }, [])

    // get active user
    const getUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${activeUser}`) 
            if (response.status >= 200 && response.status <= 299) {
                setUserActive(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // post tweet
    const handelAddTweet = () => {
        const data = {
            userName,
            tweet,
            user_id: userInfo
        }
        setIsLoading(true)
        axios.post(TWEET_URI, data).then(() => {
            setIsLoading(false)
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className='container' style={{maxWidth: "600px", margin: "0 auto"}}>
            {
                isLoading ?
                    <Spinner /> :
                    <>
                        <div className='my-4'>
                            <textarea type='text'placeholder='tweet...' value={tweet} onChange={(e) => setTweet(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <button className="btn primary-btn me-3" onClick={() => handelAddTweet()}>
                            Save
                        </button>
                        <CancelBtn />
                    </>
            }
        </div>
    )
}

export default AddTweet