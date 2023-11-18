import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UseAuthContext } from './auth/useAuthContext';
import fetchMongo from './helpers/fetchMongo';

import Navbar from './pages/navbar/Navbar';
import ReturnItem from './pages/admin/ItemReturn/ReturnForm';
import ItemForm from './pages/admin/ItemEntry/ItemForm';
import AllEntries from './pages/admin/AllItems/AllEntries';
import ChangePassword from './pages/admin/Profile/changePassword';
import AdminHome from './pages/admin/Admin_Home';
import MainLogin from './pages/login/MainLogin';
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
    <div className="App" basename="Lost_and_Found">
      <BrowserRouter>
        <Navbar user={user} />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                user && user.role === 0 ? (
                  <AdminHome />
                ) : user && user.role === 1 ? (
                  <Items />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/item-entry"
              element={
                user && user === 0 ? <ItemForm /> : <Navigate to="/login" />
              }
            />

            <Route path="/items" element={<Items itemTypes={itemTypes} />} />

            <Route
              path="/login"
              element={!user ? <MainLogin /> : <Navigate to="/" />}
            />

            <Route
              path="/itemTypes/return-item"
              element={
                user ? <ReturnItem user={user} /> : <Navigate to="/login" />
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
            <Route
              path="/all-entries"
              element={
                user ? (
                  <AllEntries user={user} items={items} Allitems={Allitems} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
