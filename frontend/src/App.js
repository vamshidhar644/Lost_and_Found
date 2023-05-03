import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Navbar from './Components/Navbar';

import ReturnItem from './pages/ReturnForm';
import ItemForm from './pages/ItemForm';
import AllEntries from './pages/AllEntries';
import ChangePassword from './pages/changePassword';
import AdminHome from './pages/Admin_Home';
import ItemReturn from './pages/ItemReturn';
import Login from './pages/Login';
import ItemTypes from './pages/Items';

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

            <Route path="/all-entries" element={<AllEntries />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/items/return-item"
              element={user ? <ReturnItem /> : <Navigate to="/items" />}
            />

            <Route path="/items/itemTypes" element={<ItemTypes />} />

            <Route
              path="/change-password"
              element={user ? <ChangePassword /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
