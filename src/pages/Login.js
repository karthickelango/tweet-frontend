import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LogInImg from '../assets/images/blog_bg.svg'
import Eye from '../assets/images/eye.svg'
import { LOGIN_URI, REGISTER_URI } from '../constants/api_urls';


export const Login = () => {
  const [name, setName] = useState('')
  const [password, setPasword] = useState('')
  const [userMsg, setUserMsg] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUrl()
  }, [])

  const fetchUrl = () => {
    axios.get(REGISTER_URI).then((res) => {
    })
  }

  const handelLogin = async () => {
    try {
      const user = {
        username: name,
        password: password
      }
      const response = await axios.post(LOGIN_URI, user)
      const token = response.data
      navigate('/')
      window.location.reload()
      localStorage.setItem('token', token)
    } catch (error) {
      console.log(error)
      if (error.response.data.error === "Invalid user name") {
        setUserMsg(true);
      } else if (error.response.data.error === "Invalid user password") {
        setPasswordMsg(true);
      }
    }
  }
  const toggleState = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className='container mt-30'>
        <div className="" style={{ maxWidth: '80%', margin: '0 auto', border: 'none' }}>
          <div className="row g-0">
            <h2 className='b-logo'>Tweet</h2>
            <div className="col-md-4 align-content-center aic">
              <div className="card-body">
                <h3 className='my-3 title mb-0'>Login</h3>
                {
                  userMsg ? <h1 className="py-4 text-color-primary text-center">User doesn't exist</h1> : <h1 className='py-4'></h1>
                }
                <div className="mb-4">
                  <input type="text" placeholder='username' className="form-control" id="username" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4 position-relative">
                  <input type={!showPassword ? "password" : "text"} placeholder='password' className="form-control" id="password" value={password} onChange={(e) => setPasword(e.target.value)} />
                  {
                    passwordMsg ? <h1 className="text-color-primary error-msg">Invalid password</h1> : ""
                  }
                  <img src={Eye} onClick={() => toggleState()} className='eye-icon' />
                </div>
                <div className='jc-sb'>
                  <Link to='/forgetpassword'>Forgrt password?</Link>
                  <button className='btn primary-btn text-center' onClick={() => handelLogin()}>Login</button>
                </div>
                <div className='my-3 label-item text-center'>
                  Don't have an account ?
                  <Link to="/signup" className='text-color-primary ps-2'>Create one</Link>
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
