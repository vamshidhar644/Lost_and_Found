import React from 'react';
import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';

const MainLogin = () => {
  return (
    <>
      <div className="d-flex ">
        <div>
          User Login
          <UserLogin />
        </div>

        <div>
          Admin Login
          <AdminLogin />
        </div>
      </div>
    </>
  );
};

export default MainLogin;
