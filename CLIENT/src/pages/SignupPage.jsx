import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

function SignupPage() {

  // Backend API URL from .env
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${API}/auth/signup`,
        {
          name,
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

      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4 overflow-hidden relative">

      {/* Glow Effects */}
      <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl rounded-full top-20 left-20"></div>

      <div className="absolute w-96 h-96 bg-purple-600/20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Signup Card */}
      <form
        onSubmit={handleSignup}
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
          Doctor Signup
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Create your medical simulator account
        </p>

        {/* Inputs */}
        <div className="space-y-5">

          {/* Name */}
          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Email */}
          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-2xl py-3 text-lg font-semibold"
          >
            Create Account
          </button>

          {/* Login Link */}
          <div className="text-center pt-2">

            <p className="text-zinc-400">

              Already have an account?{" "}

              <Link
                to="/"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Login
              </Link>

            </p>

          </div>

        </div>
      </form>
    </div>
  );
}

export default SignupPage;