import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { toast } from "react-toastify";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        toast.error("Email and password are required");
        return;
      }
      if (!email.includes("@")) {
        toast.error("Please enter a valid email address");
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      toast.success("Login successful! Redirecting to profile...");
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      toast.error(err.response.data.msg || "Login failed");
    } finally {
      setEmail("");
      setPassword("");
      setPasswordVisible(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <div className="bg-[#7d7894] w-xs md:w-lg px-6 py-10  border-white rounded-lg ">
        <h2 className="text-white text-xl font-semibold mb-12">Login</h2>
        <div className="flex flex-col gap-7 ">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-300">Email</h1>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              className="bg-zinc-200 text-gray-600 px-2 py-1 md:px-4 md:py-2 rounded-md w-40 md:w-72 outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-gray-300">Password</h1>
            <div className="flex items-center relative">
              <input
                value={password}
                type={passwordVisible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-zinc-200 text-gray-600 px-2 py-1 md:px-4 md:py-2 rounded-md w-40 md:w-72 outline-none md:pr-8 pr-8 transition-all"
              />
              <div
                className="absolute right-0 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {!passwordVisible ? (
                  <EyeClosed className="text-gray-600" />
                ) : (
                  <Eye className="text-gray-600" />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="mt-10 bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center"
          >
            {!loading ? `Login` : <Loader />}
          </button>
          <div>
            <p className="text-gray-300 text-sm text-center">
              New User ?{" "}
              <Link
                to="/signup"
                className="hover:text-white transition-colors font-semibold"
              >
                Create Account Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
