import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ItemsContextProvider } from './context/ItemContext';
import { AuthContextProvider } from './context/AuthContext';
import { AllItemsContextProvider } from './context/AllEntriesContext';
// import "antd/dist/antd.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AllItemsContextProvider>
        <ItemsContextProvider>
          <App />
        </ItemsContextProvider>
      </AllItemsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
