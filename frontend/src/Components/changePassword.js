import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const ChangePassword = () => {
  const { user } = useAuthContext();

  

  const [oldpassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  if (user) {
    return (
      <div className="login-Container" onSubmit={handleSubmit}>
        <form className="form">
          <span className="signup">change password</span>
          <input
            type="password"
            placeholder="Old password"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldpassword}
            className="form--input"
          />

          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            className="form--input"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
            className="form--input"
          />

          <button className="form--submit">Change</button>
        </form>
      </div>
    );
  }
};

export default ChangePassword;
