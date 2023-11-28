import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ItemsContextProvider } from './context/ItemContext';
import { AuthContextProvider } from './auth/AuthContext';
import { AllItemsContextProvider } from './context/AllEntriesContext';
import { ItemTypeContextProvider } from './context/ItemTypeContext';
// import { RequestsContextProvider } from './context/RequestContext';
// import "antd/dist/antd.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AllItemsContextProvider>
        <ItemsContextProvider>
          <ItemTypeContextProvider>
            {/* <RequestsContextProvider> */}
            <App />
            {/* </RequestsContextProvider> */}
          </ItemTypeContextProvider>
        </ItemsContextProvider>
      </AllItemsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
