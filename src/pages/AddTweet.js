import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import CancelBtn from '../components/CancelBtn'
import DataContext from '../context/DataContext'
import { BASE_URL, POSTIMAGE_URI, TWEET_URI } from '../constants/api_urls'
import Upload from '../assets/images/upload.svg'


const AddTweet = () => {
    const { activeUser } = useContext(DataContext)
    const [tweet, setTweet] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [userActive, setUserActive] = useState('')
    const userInfo = userActive._id
    const userName = userActive.username
    const [file, setFile] = useState()


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
    const handelAddTweet = async () => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('userName', userName)
        formData.append('tweet', tweet)
        formData.append('user_id', userInfo)
        setIsLoading(true)
        try {
            const response = await axios.post(TWEET_URI, formData)
            if (response.status >= 200 && response.status <= 299) {
                setIsLoading(false)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                            <textarea type='text' placeholder='tweet...' value={tweet} onChange={(e) => setTweet(e.target.value)} style={{ height: "50px"}} className="bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400 image-container add-tweet" >
                            <label htmlFor="upload">
                                {
                                    file ?
                                        <img src={URL.createObjectURL(file)} />
                                        :
                                        <img src={Upload} />
                                }
                                <input type='file' id='upload' onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
                            </label>
                        </h3>
                        <button className={"btn primary-btn me-3 " + (file && tweet ? '' : 'disabled')} onClick={() => handelAddTweet()}>
                            Post
                        </button>
                        <CancelBtn />
                    </>
            }
        </div>
    )
}

export default AddTweet