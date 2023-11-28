import { useState } from 'react';
import { UseAuthContext } from './useAuthContext';
// import dotenv from 'dotenv';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = UseAuthContext();

  const login = async (email, password, role) => {
    setIsLoading(true);
    setError(null);

    const backend_path = process.env.REACT_APP_BACKEND;

    const response = await fetch(`${backend_path}/api/${role}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));

      dispatch({ type: 'LOGIN', payload: json });
    }
  };
  return { login, isLoading, error };
};
