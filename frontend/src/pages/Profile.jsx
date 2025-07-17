import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import socket from "../utils/socket";

function Profile() {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Profile data:", res.data);

      setUser(res.data);
    };
    getProfile();
  }, []);

  useEffect(() => {
    socket.on("feesPaid", ({ userId }) => {
      console.log("Fees paid event received:", userId);
      if (userId === user._id) {
        setUser((prevUser) => ({ ...prevUser, feesPaid: true }));
      }
    });
    return () => {
      socket.off("feesPaid");
    };
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/update`,
        { name, email },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Profile updated:", res.data);
      toast.success(res.data.message);
      setUser(res.data.user);
      setDialogOpen(false);
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen">
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen">
      <Navbar />

      <div className="flex flex-col md:py-14 lg:py-20 py-6 md:px-20 lg:px-40 px-8 text-gray-200">
        <p className="text-lg">
          Hey{" "}
          <span className="text-lg text-white font-semibold px-2">
            {user.name}
          </span>{" "}
          Welcome to your profile page.
        </p>
        <div className="mt-10 flex md:flex-row flex-col md:items-center md:justify-between gap-4 bg-[#8e89a5] px-2 md:px-4 py-4 rounded-md">
          <div className="flex flex-col gap-4">
            <h1>Full Name : {user.name}</h1>
            <h1>Email : {user.email}</h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1>Fee Status : {user.feesPaid === false ? "Unpaid" : "Paid"}</h1>
            <button
              disabled={user.feesPaid}
              className={`bg-white w-20 rounded-md text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer ${
                user.feesPaid ? "disabled:cursor-not-allowed" : ""
              }`}
              onClick={() => navigate("/profile/pay")}
            >
              Pay Fees
            </button>
          </div>
        </div>
        <div className="lg:mt-24 md:mt-20 mt-10">
          <div className="flex items-center justify-end">
            <button
              className="bg-white text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={() => {
                setName(user.name);
                setEmail(user.email);
                setDialogOpen(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 bg-[#00000095] flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative text-gray-700">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setDialogOpen(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
