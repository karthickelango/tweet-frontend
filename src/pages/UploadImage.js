import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TWEET_URI, UPLOAD_URI } from '../constants/api_urls'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Camera from '../assets/images/camera.svg'
import Upload from '../assets/images/upload.svg'

const UploadImage = ({ activeUser }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [tweet, setTweet] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [file, setFile] = useState()

    const handelUpload = async () => {
        const formData = new FormData()
        formData.append('file', file)
        try {
            const response = await axios.put(`${UPLOAD_URI}/${activeUser}`, formData)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }


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

    useEffect(() => {
        getInfo()
    }, [])
    return (
        <>
            <span className='camera-icon' onClick={() => setOpen(!open)} >
                <img src={Camera} style={{ width: '30px', cursor: 'pointer' }} />
            </span>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
                                    <div className="bg-white">
                                        <button onClick={() => setOpen(!open)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                        <div className="p-6 text-center">
                                            <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                                <label for="upload">
                                                    <img src={Upload} style={{ width: "350px" }} />
                                                    <input type='file' id='upload' onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
                                                </label>
                                            </h3>
                                            <div className='justify-content-sp'>
                                                <button onClick={() => setOpen(!open)} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-2">Cancel</button>
                                                <button onClick={() => handelUpload()} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center btn primary-btn">
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>

    )
}

export default UploadImage