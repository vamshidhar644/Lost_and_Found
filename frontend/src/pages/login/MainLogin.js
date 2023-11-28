import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Import your custom CSS file
import UserLogin from './UserLogin';
import AdminLogin from './AdminLogin';

const App = () => {
  const [showUserLogin, setShowUserLogin] = useState(true);

  const toggleLogin = () => {
    setShowUserLogin(!showUserLogin);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center gap-3">
        <button
          className={`btn btn-outline-primary ${showUserLogin ? 'active' : ''}`}
          onClick={() => toggleLogin()}
        >
          User Login
        </button>
        <button
          className={`btn btn-outline-primary ${
            !showUserLogin ? 'active' : ''
          }`}
          onClick={() => toggleLogin()}
        >
          Admin Login
        </button>
      </div>

      <div className="login__container mt-3 p-5">
        {showUserLogin ? <UserLogin /> : <AdminLogin />}
      </div>
    </div>
  );
};

export default App;
