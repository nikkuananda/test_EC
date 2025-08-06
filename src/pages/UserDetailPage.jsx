import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserCard from "../components/UserCard";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://reqres.in/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": "reqres-free-v1",
          },
        });

        if (!res.data.data) {
          setError("User tidak ditemukan.");
        } else {
          setUser(res.data.data);
        }
      } catch (err) {
        console.error("Gagal ambil detail user:", err);
        setError("Gagal memuat detail user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-white mx-auto mb-4"
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
          <p className="text-white text-lg font-semibold">
            Memuat data pengguna...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p
        className="text-red-500 text-center mt-4"
        role="alert"
        aria-live="assertive"
      >
        {error}
      </p>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* User */}
        {user && <UserCard user={user} />}

        {/*  Back */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            aria-label="Back to previous page"
          >
            Back
          </button>
        </div>
      </div>
    </main>
  );
};

export default UserDetailPage;
