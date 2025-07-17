import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

function Navbar() {
  const [signedIn, setSignedIn] = useState(false);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setSignedIn(false);
    window.location.href = "/";
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    }
  }, []);
  return (
    <div className="w-screen px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center tracking-tighter wrap-normal  text-white font-bold text-xl">
          <h1 className="hidden md:block">Fee Management System</h1>
          <h1 className="md:hidden">FMS</h1>
        </div>
        <div className="flex items-center md:gap-7 lg:gap-8 gap-5 text-gray-300">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-white font-semibold" : "hover:text-white"
            }
          >
            All Students
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-white font-semibold" : "hover:text-white"
            }
          >
            Profile
          </NavLink>
        </div>
        <div className="">
          <div>
            {!signedIn ? (
              <Link
                to="/login"
                className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogOut}
                className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
