import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import LogInImg from '../assets/images/blog_bg.svg'
import { RESET_PASSWORD_URI } from '../constants/api_urls';


export const ResetPassword = () => {
  const [userMsg, setUserMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const { id, token } = useParams()
  const handelForgetPassword = async () => {
    try {
      const response = await axios.get(`${RESET_PASSWORD_URI}/${id}/${token}`)
    } catch (error) {
      console.log(error)
    }
  }
  const handelUpdatePassword = async () => {
    const update = {
      password: password
    }
    if (password === confirmpassword) {
      try {
        const response = await axios.put(`${RESET_PASSWORD_URI}/${id}`, update)
        if (response.status >= 200 && response.status <= 299) {
          console.log(response.data)
          console.log('hey')
        }
      }
      catch (error) {
        console.log(error)
      }
    } else {
      console.log('no')
    }
  }
  useEffect(() => {
    handelForgetPassword()
  }, [])
  return (
    <>
      <div className='container mt-30'>
        <div className="" style={{ maxWidth: '80%', margin: '0 auto', border: 'none' }}>
          <div className="row g-0">
            <h2 className='b-logo'>Tweet</h2>
            <div className="col-md-4 align-content-center aic">
              <div className="card-body">
                <h3 className='my-3 title mb-0'>Enter new password</h3>
                {
                  userMsg ? <h1 className="py-4 text-color-primary text-center">Email sent successfully</h1> : <h1 className='py-4'></h1>
                }
                {
                  errorMsg ? <h1 className="py-4 text-color-primary text-center">Enter valid email</h1> : ''
                }
                <div className="mb-4">
                  <input type="text" placeholder='new password' className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-4">
                  <input type="text" placeholder='confirm password' className="form-control" id="confirm" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className='text-center'>
                  <button className='btn primary-btn' onClick={() => handelUpdatePassword()}>Update</button>
                </div>
              </div>
            </div>
            <div className="col-md-8 align-content-center">
              <img src={LogInImg} className="img-fluid rounded-start" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
