import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeCard from "../components/HomeCard";

const dummyEmployeeInfo = [
  { role: "Software Engineer Lead", type: "Remote", joinDate: "2 May 2021" },
  { role: "Project Manager", type: "Outsource", joinDate: "26 Aug 2021" },
  { role: "UI/UX Designer", type: "Full Time", joinDate: "7 Sept 2021" },
  { role: "Project Manager", type: "Freelance", joinDate: "29 Sept 2021" },
  { role: "Platform Engineer", type: "Freelance", joinDate: "14 Sept 2021" },
  { role: "Platform Engineer", type: "Remote", joinDate: "14 Jan 2021" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `https://reqres.in/api/users?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": "reqres-free-v1",
            },
          }
        );
        setUsers(res.data.data);
        setTotalPages(res.data.total_pages);
      } catch {
        setError("Gagal mengambil data pengguna.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, token, navigate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 300000);
    return () => clearInterval(intervalId);
  }, []);

  const filteredUsers = users.filter((u) =>
    `${u.first_name} ${u.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const goToUserDetail = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 flex flex-col font-sans pt-4 pb-20">
      <div className="max-w-6xl mx-auto w-full">
        {loading ? (
          <div
            className="flex justify-center items-center min-h-[60vh]"
            aria-label="Loading"
            role="status"
            aria-live="polite"
          >
            <svg
              className="animate-spin h-12 w-12 text-white"
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
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mt-4 text-white">
              Welcome to Cit Cat 👋
            </h1>
            <p className="text-center text-blue-200 mb-8">
              Your all-in-one employee management solution.
            </p>

            {/* Search bar */}
            <div className="mb-5 max-w-xl mx-auto relative">
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            {/* Error message */}
            {error && (
              <div className="max-w-6xl mx-auto px-4 py-2 mb-4 text-red-700 bg-red-100 rounded text-center">
                {error}
              </div>
            )}

            {/* Cards Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => {
                  const info =
                    dummyEmployeeInfo[idx % dummyEmployeeInfo.length];
                  return (
                    <HomeCard
                      key={user.id}
                      user={user}
                      info={info}
                      onDetail={() => goToUserDetail(user.id)}
                    />
                  );
                })
              ) : (
                <div className="col-span-full text-center text-gray-600">
                  No employees found.
                </div>
              )}
            </section>

            {/* Pagination */}
            <nav
              className="flex justify-center gap-4 my-10"
              aria-label="Pagination"
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded px-4 py-1 text-blue-700 bg-gray-100 hover:bg-gray-200 disabled:text-gray-300"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`rounded px-3 py-1 font-semibold ${
                    page === i + 1
                      ? "text-white bg-blue-700"
                      : "text-blue-700 bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded px-4 py-1 text-blue-700 bg-gray-100 hover:bg-gray-200 disabled:text-gray-300"
              >
                Next
              </button>
            </nav>
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
