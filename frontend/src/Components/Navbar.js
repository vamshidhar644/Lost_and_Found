import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import '../Styles/Navbar.css';
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="Navcontainer">
        <Link to="/">
          <h1>
            Lost and Found <span>Student Record Section</span>
          </h1>
        </Link>

        {user && (
          <div className="login-logout">
            <span>{user.email} </span>
            <div onClick={handleClick}>Logout</div>
          </div>
        )}
        {!user && (
          <div className="login-logout">
            <Link to="/login" className="login-btn">
              Admin login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
