import axios from 'axios';
import React from 'react'
import { createContext, useEffect, useState } from "react";
import { FOLLOWER_URL } from '../constants/api_urls';

const DataContext = createContext({})
export const DataProvider = ({ children }) => {
    const userToken = localStorage.getItem('token')
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    const token = userToken;
    const user = parseJwt(token)
    const [activeUser, setActiveUser] = useState(user?.userId)
    const [isLoading, setIsLoading] = useState(false)
    const [tweet, setTeeet] = useState([])
    const [follower, setFollower] = useState([])

    // useEffect
    useEffect(() => {
        getFollowers()
    }, [])

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
    return (
        <DataContext.Provider value={{ activeUser, tweet, setIsLoading, isLoading, follower, setFollower }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext