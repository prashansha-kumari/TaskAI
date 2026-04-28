import { useState } from "react";
import axios from "axios";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://taskai-backend-lsyq.onrender.com/api/auth/login",
        {
          email,
          password,
        },
      );

      localStorage.setItem("token", res.data.token);
      setPage("dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
    >
      {/* GLASS CARD */}
      <div
        className="w-96 p-8 rounded-2xl 
      bg-white/5 backdrop-blur-xl 
      border border-white/20 
      shadow-[0_0_40px_rgba(128,0,255,0.3)]"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Welcome Back 👋
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            className="p-3 rounded-lg 
            bg-transparent border border-white/30 
            text-white placeholder-gray-300 
            focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg 
            bg-transparent border border-white/30 
            text-white placeholder-gray-300 
            focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="mt-2 py-3 rounded-lg 
            bg-gradient-to-r from-purple-500 to-indigo-500 
            text-white font-semibold 
            hover:scale-[1.02] transition 
            shadow-[0_0_20px_rgba(128,0,255,0.5)]"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-center text-gray-300 mt-5">
          Don’t have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => setPage("signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
