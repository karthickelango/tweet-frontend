import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const isUserSignedIn = localStorage?.getItem('token')
    const navigate = useNavigate()

    const handelSignOut = () => {
        localStorage.removeItem('token')
        navigate('/')
        window.location.reload()
    }
    return (
        <>
            <nav className="navbar bg-body-tertiary px-5">
                <div className="container-fluid">
                    <Link to='/'>
                        <h2 className='b-logo'>TweetX</h2>
                    </Link>
                    <ul className="nav justify-content-end">
                        {
                            isUserSignedIn ?
                                <>
                                    <NavLink to='/' className="nav-item">
                                        <span className="nav-link" aria-current="page">Feed</span>
                                    </NavLink>
                                    <NavLink to='/users' className="nav-item">
                                        <span className="nav-link" aria-current="page">Users</span>
                                    </NavLink>
                                    <NavLink to='/profile' className="nav-item">
                                        <span className="nav-link" aria-current="page">Profile</span>
                                    </NavLink>
                                    <li><button className="btn secondary-btn mt-5" onClick={() => handelSignOut()}>Signout</button></li>
                                </>
                                :
                                <></>
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar