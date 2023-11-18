import React, { useState } from 'react';
import { useLogin } from '../../auth/useLogin';

const UserLogin = () => {
  const [email, setEmail] = useState();
  const [error, setError] = useState(null);

  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z]+\.(\d{2}[a-zA-Z]{3}\d{4,})@vitap\.ac\.in$/;

    if (!email) {
      setError('Email is Empty');
      // return;
    } else if (!emailPattern.test(email)) {
      setError('Invalid Email Format');
    } else {
      const match = email.match(emailPattern);

      const extractedString = match[1];

      await login(email, extractedString, 'user');

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
