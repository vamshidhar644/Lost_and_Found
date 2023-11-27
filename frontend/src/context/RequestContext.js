// import { createContext, useReducer } from 'react';

// export const RequestContext = createContext();

// export const requestReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_REQUEST':
//       return {
//         requests: action.payload,
//       };
//     case 'CREATE_REQUEST':
//       return {
//         requests: [action.payload, ...state.requests],
//       };
//     case 'DELETE_REQUEST':
//       return {
//         requests: state.requests.filter(
//           (request) => request._id !== action.payload._id
//         ),
//       };
//     default:
//       return state;
//   }
// };

// export const RequestsContextProvider = ({ children }) => {
//   const [state, Reqdispatch] = useReducer(requestReducer, {
//     requests: null,
//   });

//   return (
//     <RequestContext.Provider value={{ ...state, Reqdispatch }}>
//       {children}
//     </RequestContext.Provider>
//   );
// };
