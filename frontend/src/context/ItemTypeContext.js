import { createContext, useReducer } from 'react';

export const ItemTypesContext = createContext();

export const ItemTypeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        itemTypes: action.payload,
      };
    case 'CREATE_ITEM':
      return {
        itemTypes: [action.payload, ...state.itemTypes],
      };
    case 'DELETE_ITEM':
      return {
        itemTypes: state.items.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ItemTypeContextProvider = ({ children }) => {
  const [state, itemTypedispatch] = useReducer(ItemTypeReducer, {
    itemTypes: null,
  });

  return (
    <ItemTypesContext.Provider value={{ ...state, itemTypedispatch }}>
      {children}
    </ItemTypesContext.Provider>
  );
};
