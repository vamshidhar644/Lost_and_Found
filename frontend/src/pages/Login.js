import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import '../Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };
  return (
    <div className="login-Container" onSubmit={handleSubmit}>
      <form className="form">
        <span className="signup">Login</span>
        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="form--input"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="form--input"
        />

        <button className="form--submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
    // <form className="login" onSubmit={handleSubmit}>
    //   <h3>Login</h3>
    //   <label>Email: </label>
    //   <input

    //   />
    //   <label>Password: </label>
    //   <input

    //   />

    //   <button>
    //     {' '}
    //     Login
    //     <span></span>
    //   </button>
    //
    // </form>
  );
};

export default Login;
