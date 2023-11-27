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
import RequestPage from './pages/user/RequestPage';

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
    user && fetchAllItems(user);
  }, [user]);

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
                  <Items itemTypes={itemTypes} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/item-entry"
              element={
                user ? <ItemForm user={user} /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/items"
              element={
                user ? (
                  <Items itemTypes={itemTypes} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/login"
              element={!user ? <MainLogin /> : <Navigate to="/" />}
            />

            <Route
              path="/itemTypes/return-item"
              element={
                user && user.role === 0 ? (
                  <ReturnItem user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/items/:itemType"
              element={
                user ? (
                  <ItemTypes user={user} items={items} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/items/:type/:item_id"
              element={
                user && user.role === 1 ? (
                  <RequestPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/change-password"
              element={
                user && user.role === 0 ? (
                  <ChangePassword user={user} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/all-entries"
              element={
                user && user.role === 0 ? (
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
