import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login response:", res.data);

      // Save JWT
      localStorage.setItem("token", res.data.token);

      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Go to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.log("Login error:", err);

      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold">DIGIWILL</h1>

          <p className="text-gray-500 mt-2">Secure Digital Legacy</p>
        </div>

        {/* Login Card */}

        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>

          <p className="text-gray-500 mb-8">
            Login to access your digital vault.
          </p>

          {/* Error */}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-green-500
                "
              />
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-green-500
                "
              />
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-black
                text-white
                rounded-xl
                py-3.5
                font-semibold
                hover:bg-gray-900
                transition
                disabled:opacity-50
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register */}

          <p className="text-center text-gray-500 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-green-600 font-semibold hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
