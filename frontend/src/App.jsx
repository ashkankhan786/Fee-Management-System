import React from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import PrivateRoute from "./utils/PrivateRoute";
import Students from "./pages/Students";
import PayFee from "./pages/PayFee";
function App() {
  return (
    <div className="bg-gradient-to-b from-[#6C687F] to-[#3c3a47] via-[#504d60] h-screen">
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="profile/pay"
          element={
            <PrivateRoute>
              <PayFee />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
