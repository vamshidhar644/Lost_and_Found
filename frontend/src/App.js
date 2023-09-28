import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './auth/useAuthContext';

import Navbar from './pages/navbar/Navbar';

import ReturnItem from './pages/admin/ItemReturn/ReturnForm';
import ItemForm from './pages/admin/ItemEntry/ItemForm';
import AllEntries from './pages/admin/AllItems/AllEntries';
import ChangePassword from './pages/admin/Profile/changePassword';
import AdminHome from './pages/admin/Admin_Home';
import ItemReturn from './pages/admin/ItemReturn/ItemReturn';
import Login from './pages/admin/login/Login';
import ItemTypes from './pages/items/Items';

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <AdminHome /> : <Navigate to="/items" />}
            />

            <Route path="/item-entry" element={<ItemForm />} />

            <Route path="/items" element={<ItemReturn />} />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/itemTypes/return-item"
              element={user ? <ReturnItem /> : <Navigate to="/items" />}
            />

            <Route path="/items/itemTypes" element={<ItemTypes />} />

            <Route
              path="/change-password"
              element={user ? <ChangePassword /> : <Navigate to="/" />}
            />
            <Route path="/all-entries" element={<AllEntries />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
