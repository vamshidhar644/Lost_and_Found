import { AllEntriesContext } from '../context/AllEntriesContext';
import { useContext } from 'react';

export const useAllentriesContext = () => {
  const context = useContext(AllEntriesContext);

  if (!context) {
    throw Error(
      'useAllentriesContext must be used inside an AllEntriesContextProvider'
    );
  }

  return context;
};
