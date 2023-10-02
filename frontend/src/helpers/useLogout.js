import { UseAuthContext } from '../auth/useAuthContext';

export const useLogout = () => {
  const { dispatch } = UseAuthContext();

  const logout = () => {
    localStorage.removeItem('admin');

    dispatch({ type: 'LOGOUT' });
  };
  return { logout };
};
