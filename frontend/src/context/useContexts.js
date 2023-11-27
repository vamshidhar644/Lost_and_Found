import { ItemsContext } from './ItemContext';
import { ItemTypesContext } from './ItemTypeContext';
import { AllEntriesContext } from '../context/AllEntriesContext';
import { useContext } from 'react';
import { RequestContext } from './RequestContext';

export const UseItemsContext = () => {
  const context = useContext(ItemsContext);

  if (!context) {
    throw Error('useItemContext must be used inside an ItemsContextProvider');
  }

  return context;
};

export const UseItemTypesContext = () => {
  const context = useContext(ItemTypesContext);

  if (!context) {
    throw Error(
      'useItemTypeContext must be used inside an ItemTypesContextProvider'
    );
  }

  return context;
};

export const UseAllentriesContext = () => {
  const context = useContext(AllEntriesContext);

  if (!context) {
    throw Error(
      'useAllentriesContext must be used inside an AllEntriesContextProvider'
    );
  }

  return context;
};

// export const UseRequestsContext = () => {
//   const context = useContext(RequestContext);

//   if (!context) {
//     throw Error(
//       'useRequestsContext must be used inside an RequestsContextProvider'
//     );
//   }
// };
