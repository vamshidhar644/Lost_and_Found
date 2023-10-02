import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UseAuthContext } from './auth/useAuthContext';
import fetchMongo from './helpers/fetchMongo';

import Navbar from './pages/navbar/Navbar';
import ReturnItem from './pages/admin/ItemReturn/ReturnForm';
import ItemForm from './pages/admin/ItemEntry/ItemForm';
import AllEntries from './pages/admin/AllItems/AllEntries';
import ChangePassword from './pages/admin/Profile/changePassword';
import AdminHome from './pages/admin/Admin_Home';
import Login from './pages/admin/login/Login';
import ItemTypes from './pages/items/ItemTypes';
import { useEffect } from 'react';
import Items from './pages/items/Items';

function App() {
  const { user } = UseAuthContext();
  const {
    fetchItems,
    fetchItemTypes,
    fetchAllItems,
    Allitems,
    itemTypes,
    items,
  } = fetchMongo();

  useEffect(() => {
    fetchItems();
    fetchItemTypes();
    fetchAllItems();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <AdminHome /> : <Navigate to="/items" />}
            />

            <Route
              path="/item-entry"
              element={
                <ItemForm user={user} items={items} allItems={Allitems} />
              }
            />

            <Route path="/items" element={<Items itemTypes={itemTypes} />} />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/itemTypes/return-item"
              element={
                user ? <ReturnItem user={user} /> : <Navigate to="/items" />
              }
            />

            <Route
              path="/items/:itemType"
              element={<ItemTypes user={user} items={items} />}
            />

            <Route
              path="/change-password"
              element={
                user ? <ChangePassword user={user} /> : <Navigate to="/" />
              }
            />
            <Route path="/all-entries" element={<AllEntries user={user} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
