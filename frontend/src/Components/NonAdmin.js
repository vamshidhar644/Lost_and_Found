import React from 'react'
import { Link } from 'react-router-dom'

const NonAdmin = () => {
  return (
    <div className="Return-Section">
    <h3>Admin has to login</h3>
    <Link to="/login" className="login-btn">
        Admin login
    </Link>
    </div>
  )
}

export default NonAdmin