import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
    window.location.reload(false);
  }
  return (
    <header>
        <div className='container'>
            <Link to="/">
                <h1>Lost and Found <span>Student Record Center</span></h1>
            </Link>
            <nav>
              {user && (
                  <div>
                    <span>{user.email} </span>
                    <button onClick={handleClick}>Logout</button>
                  </div>
                )}
                {!user && (                  
                  <div>
                    <Link to="/login" className='login-btn'>Admin login</Link>
                    {/* <Link to="/signup">Signup</Link> */}
                  </div>
                )}
            </nav>
        </div>
    </header>
  )
}

export default Navbar