import { useState } from 'react';
import { useLogin } from '../../auth/useLogin';
import './Login.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    await login(email, password, 'admin');
  };
  return (
    <div className="admin_login__container p-5">
      <form className="admin__form d-flex flex-column" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control p-3"
            id="adminEmail"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control p-3"
            id="adminPassword"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button type="submit" className="btn btn-primary p-3">
          Login
        </button>
        {error && <div className="login__error mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default AdminLogin;
