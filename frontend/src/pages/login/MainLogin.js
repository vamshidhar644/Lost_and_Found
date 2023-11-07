import React from 'react';
import AdminLogin from './AdminLogin';

const MainLogin = () => {
  return (
    <>
      <div className="d-flex ">
        <div>
          User Login
          <button>Continue with Google</button>
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
