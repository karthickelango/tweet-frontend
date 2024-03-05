import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LogInImg from '../assets/images/blog_bg.svg'
import { FORGET_PASSWORD_URI, LOGIN_URI, REGISTER_URI } from '../constants/api_urls';


export const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState(false)
  const [errorMsg , setErrorMsg] = useState(false)
  const navigate = useNavigate()

  const handelForgetPassword = async () => {
    try {
      const update = {
        email: email
      }
      const response = await axios.post(FORGET_PASSWORD_URI, update)
      if (response.status >= 200 && response.status <= 299) {
        setUserMsg(true);
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.error === "User not found") {
        setErrorMsg(true);
      } 
    }
  }
  useEffect(() => {
  }, [])
  return (
    <>
      <div className='container mt-30'>
        <div className="" style={{ maxWidth: '80%', margin: '0 auto', border: 'none' }}>
          <div className="row g-0">
            <h2 className='b-logo'>Tweet</h2>
            <div className="col-md-4 align-content-center aic">
              <div className="card-body">
                <h3 className='my-3 title mb-0'>Reset your password</h3>
                {
                  userMsg ? <h1 className="py-4 text-color-primary text-center">Email sent successfully</h1> : <h1 className='py-4'></h1>
                }
                {
                  errorMsg ? <h1 className="py-4 text-color-primary text-center">Enter valid email</h1> : ''
                }
                <div className="mb-4">
                  <input type="text" placeholder='Email' className="form-control" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='text-center'>
                  <button className='btn primary-btn' onClick={() => handelForgetPassword()}>Reset password</button>
                </div>
                <div className='my-3 label-item text-center'>
                  Remember password?
                  <Link to="/" className='text-color-primary ps-2'>Login</Link>
                </div>
              </div>
            </div>
            <div className="col-md-8 align-content-center dis-mob-none">
              <img src={LogInImg} className="img-fluid rounded-start" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
