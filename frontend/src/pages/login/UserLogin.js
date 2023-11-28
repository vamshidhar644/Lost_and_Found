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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="user_email"
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p>{error}</p>}

      <button>Submit</button>
    </form>
  );
};

export default UserLogin;
