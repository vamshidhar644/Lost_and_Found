import { useState } from 'react';
import { UseAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = UseAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const backend_path = 'https://lf-backend-aaqr.onrender.com';

    const response = await fetch(`${backend_path}/api/admin/login`, {
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
      localStorage.setItem('admin', JSON.stringify(json));

      dispatch({ type: 'LOGIN', payload: json });
    }
  };
  return { login, isLoading, error };
};
