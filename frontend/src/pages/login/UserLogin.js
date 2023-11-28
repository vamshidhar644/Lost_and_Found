import React, { useState } from 'react';
import { useLogin } from '../../auth/useLogin';

const UserLogin = () => {
  const [email, setEmail] = useState();
  const [error, setError] = useState(null);

  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@vitap\.ac\.in$/;

    if (!email) {
      setError('Email is Empty');
      // return;
    } else if (!emailPattern.test(email)) {
      setError('Invalid Email Format');
    } else {
      const parts = email.split('.');

      const password = parts[parts.length - 1];

      await login(email, password, 'user');

      setError('correct');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="user_login__form p-5 d-flex flex-column justify-content-center"
    >
      <div className="user__login_box d-flex gap-3">
        <input
          type="email"
          className="user_email w-100 p-2 mb-2"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="user_login__submit p-2 px-4 h-100">Submit</button>
      </div>
      {error && <p className="login__error">{error}</p>}
    </form>
  );
};

export default UserLogin;
