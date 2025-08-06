import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "../services/Api";
import illustration from "../assets/login.png";
import EmailInfoModal from "../components/EmailInfoModal";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const [showEmailInfo, setShowEmailInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await Api.post("/login", form);

      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("loginStatusChanged"));

      navigate("/");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError("Login gagal. Periksa email dan password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-blue-300 to-blue-500 p-4">
        <div className="flex w-full max-w-5xl rounded-lg shadow-lg overflow-hidden flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-blue-500 flex flex-col items-center justify-center p-10 relative">
            <img
              src={illustration}
              alt="Login Illustration"
              className="w-4/5 max-w-xs object-contain"
            />
          </div>

          <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center mb-6 text-gray-400 hover:text-blue-500 transition text-sm"
              type="button"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>

            <h2 className="font-bold text-2xl mb-2 text-blue-700">
              Account Login
            </h2>
            <p className="text-gray-500 mb-8 text-sm">
              If you are already a member you can login with your email address
              and password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border border-blue-200 rounded px-4 py-2 placeholder-blue-400 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border border-blue-200 rounded px-4 py-2 placeholder-blue-400 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-500 border-blue-300 rounded focus:ring-blue-400"
                  disabled={loading}
                />
                <label
                  htmlFor="remember"
                  className="text-gray-700 text-sm select-none"
                >
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded font-semibold transition flex justify-center items-center gap-2 ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth={4}
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                )}
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-500 text-xs">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign up here
              </Link>
            </p>

            {error && <p className="mt-4 text-center text-red-500">{error}</p>}
            <button
              type="button"
              onClick={() => setShowEmailInfo(true)}
              className="mt-4 text-blue-600 underline hover:text-blue-800"
            >
              Info
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EmailInfoModal
        isOpen={showEmailInfo}
        onClose={() => setShowEmailInfo(false)}
      />
    </>
  );
};

export default LoginPage;
