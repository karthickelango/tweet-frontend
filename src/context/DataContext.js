import axios from 'axios';
import React from 'react'
import { createContext, useEffect, useState } from "react";
import { FOLLOWER_URL } from '../constants/api_urls';
import { MYTWEET_URI } from '../constants/api_urls';

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

    
    return (
        <DataContext.Provider value={{ activeUser, tweet, setIsLoading, isLoading, follower, setFollower }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext