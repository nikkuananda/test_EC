import React from "react";
import PropTypes from "prop-types";

export default function HomeCard({ user, info, onDetail }) {
  return (
    <article className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-blue-300 shadow-md"
      />
      <h2
        className="text-center font-semibold text-blue-900 text-lg w-full truncate mb-1"
        title={`${user.first_name} ${user.last_name}`}
      >
        {user.first_name} {user.last_name}
      </h2>
      <p
        className="text-blue-600 text-sm mb-1 text-center truncate w-full"
        title={user.email}
      >
        {user.email}
      </p>
      <p
        className="text-blue-600 text-sm mb-1 text-center truncate w-full"
        title={`Phone: ${user.phone}`}
      >
        Phone: {user.phone}
      </p>
      <p className="text-gray-500 text-xs mt-1">
        {info.role || "No role"} - {info.type || "No type"} - Joined{" "}
        {info.joinDate || "No date"}
      </p>
      <button
        onClick={onDetail}
        type="button"
        aria-label={`Lihat detail profil ${user.first_name} ${user.last_name}`}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        Detail
      </button>
    </article>
  );
}

HomeCard.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  info: PropTypes.shape({
    role: PropTypes.string,
    type: PropTypes.string,
    joinDate: PropTypes.string,
  }).isRequired,
  onDetail: PropTypes.func.isRequired,
};
