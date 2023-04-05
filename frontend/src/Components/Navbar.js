import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import '../Styles/Navbar.css';
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [showDropdown, setShowDropdown] = useState();
  const divRef = useRef(null);

  const handleHoverClick = () => {
    setShowDropdown(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [divRef]);

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
            <div
              className="dropdown-container"
              onClick={handleHoverClick}
              ref={divRef}
            >
              <p>Profile</p>
              {showDropdown && (
                <div className="dropdown-items">
                  <div className="arrow-down"></div>
                  <Link className="item-drop" to="/change-password">
                    Change Password
                  </Link>
                  <Link className="item-drop" onClick={handleClick}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
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
