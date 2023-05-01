import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './resources/global.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import AdminHome from './pages/Admin/AdminHome';
import AdminBuses from './pages/Admin/AdminBuses';
import AdminUsers from './pages/Admin/AdminUsers';
import BookNow from "./pages/BookNow";
import Bookings from './pages/Bookings';
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import AdminBookings from './pages/Admin/AdminBookings';
import About from './pages/About';

function App() {
  //<Route path="/dashboard" element={<dashboard/>} />
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          <Route path="/admin/buses" element={<ProtectedRoute><AdminBuses /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookings /></ProtectedRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/book-now/:id" element={<ProtectedRoute><BookNow /></ProtectedRoute>}/>
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>}/>
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;