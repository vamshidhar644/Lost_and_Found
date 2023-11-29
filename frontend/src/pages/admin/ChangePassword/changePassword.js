import React, { useState } from 'react';
import './ChangePassword.css';
import axios from 'axios';
import { useLogout } from '../../../auth/useLogout';
const ChangePassword = ({ user }) => {
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
      <div className="change_pass_container d-flex align-items-center justify-content-center">
        <form className="change-pass-form p-5">
          <h1 className="change-pass-h1 mb-4">Change Password</h1>
          <div className="form-group">
            <input
              type="password"
              required={true}
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldpassword}
              className="form-control old-password"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required={true}
              className="form-control new-password"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPass(e.target.value)}
              required={true}
              value={confirmPass}
              className="form-control confirm-password"
            />
          </div>

          <button
            className="btn btn-primary change-pass-form-submit"
            onClick={() => handleSubmit()}
          >
            Change
          </button>

          {error && (
            <div className="alert alert-danger login-error">{error}</div>
          )}
        </form>
      </div>
    );
  }
};

export default ChangePassword;
