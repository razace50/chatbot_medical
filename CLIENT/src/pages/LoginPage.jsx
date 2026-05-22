import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

function LoginPage() {

  // Backend API URL from .env
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${API}/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Invalid Email or Password");
    }
  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl rounded-full top-20 left-20"></div>

      <div className="absolute w-96 h-96 bg-purple-600/20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl"
      >

        {/* Logo */}
        <div className="flex justify-center mb-6">

          <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-lg">

            <Stethoscope size={38} className="text-white" />

          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Doctor Login
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          AI Medical Patient Simulator
        </p>

        {/* Inputs */}
        <div className="space-y-5">

          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-2xl py-3 text-lg font-semibold text-white"
          >
            Login
          </button>

          {/* Signup Link */}
          <div className="text-center pt-5">

            <p className="text-zinc-400">

              New Doctor?{" "}

              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

        {/* Bottom Text */}
        <p className="text-center text-zinc-500 text-sm mt-8">
          Virtual Clinical Patient Interaction System
        </p>

      </form>
    </div>
  );
}

export default LoginPage;