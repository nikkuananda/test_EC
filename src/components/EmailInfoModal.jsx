import React from "react";

const EmailInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="modal-title" className="text-lg font-semibold mb-4 text-center">
          Contoh Email dan Password untuk API
        </h3>
        <p className="mb-2 text-center text-gray-700">
          Gunakan email dan password berikut untuk registrasi & login:
        </p>
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-center">
          {`Email: eve.holt@reqres.in
Password: cityslicka`}
        </pre>
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="button"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailInfoModal;
