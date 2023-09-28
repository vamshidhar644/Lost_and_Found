import { useAuthContext } from '../auth/useAuthContext';
// import { useItemsContext } from './useItemsContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  // const { dispatch: itemsDispatch } = useItemsContext();

  const logout = () => {
    localStorage.removeItem('user');

    dispatch({ type: 'LOGOUT' });

    // itemsDispatch({ type: 'SET_ITEMS', payload: null });
  };
  return { logout };
};
