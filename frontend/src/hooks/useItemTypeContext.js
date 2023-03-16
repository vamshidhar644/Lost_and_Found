import { ItemTypesContext } from '../context/ItemTypeContext';
import { useContext } from 'react';

export const useItemTypesContext = () => {
  const context = useContext(ItemTypesContext);

  if (!context) {
    throw Error(
      'useItemTypeContext must be used inside an ItemTypesContextProvider'
    );
  }

  return context;
};
