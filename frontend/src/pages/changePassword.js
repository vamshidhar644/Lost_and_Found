import React, { useState } from 'react';
import { useAuthContext } from '../auth/useAuthContext';
import axios from 'axios';
import { useLogout } from '../helpers/useLogout';
const ChangePassword = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [oldpassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    if (oldpassword === user.password) {
      const email = user.email;

      if (newPassword === confirmPass) {
        axios
          .patch('/api/user', {
            email: email,
            password: newPassword,
          })
          .then((res) => {
            alert('Password changed successfully');
          })
          .catch((err) => {
            console.log(err);
          });
        logout();
      } else {
        setError('Confirm password is wrong');
      }
    } else {
      setError('Old password is incorrect');
    }
  };

  if (user) {
    return (
      <div className="login-Container" onSubmit={handleSubmit}>
        <form className="form">
          <span className="signup">change password</span>
          <input
            type="password"
            required={true}
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
            required={true}
            className="form--input"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPass(e.target.value)}
            required={true}
            value={confirmPass}
            className="form--input"
          />

          <button className="form--submit">Change</button>
        {error && <div className="error">{error}</div>}
        </form>
      </div>
    );
  }
};

export default ChangePassword;
