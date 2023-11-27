import { createContext, useReducer } from 'react';

export const AllEntriesContext = createContext();

export const AllitemsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        Allitems: action.payload,
      };
    case 'CREATE_ITEM':
      return {
        Allitems: [action.payload, ...state.Allitems],
      };
    case 'DELETE_ITEM':
      return {
        Allitems: state.Allitems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const AllItemsContextProvider = ({ children }) => {
  const [state, Alldispatch] = useReducer(AllitemsReducer, {
    Allitems: null,
  });

  return (
    <AllEntriesContext.Provider value={{ ...state, Alldispatch }}>
      {children}
    </AllEntriesContext.Provider>
  );
};
