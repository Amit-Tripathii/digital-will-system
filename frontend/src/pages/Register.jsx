import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log("Register response:", res.data);

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.log("Register error:", err);

      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
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

        {/* Register Card */}

        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>

          <p className="text-gray-500 mb-8">
            Create your secure digital vault.
          </p>

          {/* Error */}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}

          {/* Success */}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 rounded-xl px-4 py-3 mb-5">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
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
                placeholder="Create a password"
                required
                minLength={6}
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
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
