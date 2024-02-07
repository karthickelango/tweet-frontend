import React from 'react'
import { Link } from 'react-router-dom'
const BackButton = ({ destination = '/' }) => {
  return (

    <button className="btn secondary-btn">
      <Link to={destination}>
        Cancel
      </Link>
    </button>
  )
}

export default BackButton