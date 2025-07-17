import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { toast } from "react-toastify";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      if (!email || !name || !password || !confirmPassword) {
        toast.error("All fields are required");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (!email.includes("@")) {
        toast.error("Please enter a valid email address");
        return;
      }
      console.log("Signup data:", { email, name, password });
      console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          email,
          name,
          password,
        }
      );
      console.log("Signup response:", res.data);

      localStorage.setItem("token", res.data.token);
      toast.success("Signup successful! Redirecting to profile...");
      navigate("/profile");
    } catch (err) {
      toast.error(err.response.data.msg || "Signup failed");
    } finally {
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      setConfirmPasswordVisible(false);
      setPasswordVisible(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <div className="bg-[#7d7894] w-xs md:w-lg px-6 py-10  border-white rounded-lg ">
        <h2 className="text-white text-xl font-semibold mb-12">
          Create new account
        </h2>
        <div className="flex flex-col gap-7 ">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-300">Email</h1>

            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              className="bg-zinc-200 text-gray-600 px-2 py-1 md:px-4 md:py-2 rounded-md w-40 md:w-72 outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-gray-300">Full Name</h1>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
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
          <div className="flex items-center justify-between">
            <h1 className="text-gray-300">Confirm Password</h1>
            <div className="flex items-center relative">
              <input
                value={confirmPassword}
                type={confirmPasswordVisible ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="bg-zinc-200 text-gray-600 px-2 py-1 md:px-4 md:py-2 rounded-md w-40 md:w-72 outline-none md:pr-8 pr-8 transition-all"
              />
              <div
                className="absolute right-0 cursor-pointer"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                {!confirmPasswordVisible ? (
                  <EyeClosed className="text-gray-600" />
                ) : (
                  <Eye className="text-gray-600" />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={handleSignup}
            className="mt-10 bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center"
          >
            {!loading ? `Signup` : <Loader />}
          </button>
          <div>
            <p className="text-gray-300 text-sm text-center">
              Existing User ?{" "}
              <Link
                to="/login"
                className="hover:text-white transition-colors font-semibold"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
