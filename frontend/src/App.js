import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './Components/Navbar';
import AdminHome from './pages/Admin_Home';
import ItemReturn from './Components/Item_Return';
import Login from './pages/Login';
import ReturnItem from './Components/ReturnItem';
import ItemForm from './Components/ItemForm';
import AllEntries from './Components/AllEntries';

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

            <Route path="/items/return-item" element={<ReturnItem />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
