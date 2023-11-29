import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../auth/useLogout';

import './Navbar.css';
import { NAVBAR_ITEMS } from '../../constants';

const Navbar = ({ user }) => {
  const { logout } = useLogout();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <header>
      <div className="Navcontainer p-3 d-flex align-items-center justify-content-between">
        <Link to="/">
          <h1>
            Lost and Found <span>Student Record Section</span>
          </h1>
        </Link>

        {user && (
          <div
            className="dropdown-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="dropdown-trigger px-5 py-2">Profile</div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <ul>
                  {user.role === 0 ? (
                    <li>
                      {' '}
                      <Link className="item-drop" to="/change-password">
                        Change Password
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link className="item-drop" to="/my-requests">
                        My Requests
                      </Link>
                    </li>
                  )}

                  <li onClick={() => logout()}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
