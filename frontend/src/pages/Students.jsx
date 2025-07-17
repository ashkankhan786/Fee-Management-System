import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import StudentCard from "../components/StudentCard";
import socket from "../utils/socket";

function Students() {
  const [users, setUsers] = useState([1]);
  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/all`
      );
      setUsers(res.data);
      console.log("Users data:", res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    socket.on("feesPaid", ({ userId }) => {
      console.log("Fees paid event received:", userId);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === userId ? { ...u, feesPaid: true } : u))
      );
    });

    socket.on("profileUpdated", ({ userId, name, email }) => {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === userId ? { ...u, name, email } : u))
      );
    });

    return () => {
      socket.off("feesPaid");
      socket.off("profileUpdated");
    };
  }, []);

  useEffect(() => {
    console.log("Users data:", users);
  }, [users]);

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen">
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-screen">
      <Navbar />
      <div className="mt-10 md:px-20 px-12">
        <h1 className="text-xl font-semibold text-white">All Students</h1>
        <div className="mt-7 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {users.map((s) => (
            <StudentCard key={s._id} s={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Students;
