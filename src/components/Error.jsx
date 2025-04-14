import { FaExclamationTriangle } from "react-icons/fa";
import React from "react";
export default function Error({ error }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div className="flex items-center">
        <FaExclamationTriangle className="text-red-500 text-xl mr-3" />
        <div>
          <h3 className="text-red-800 font-medium text-lg">Error</h3>
          {error &&
            Array.isArray(error) &&
            error.map((err, i) => (
              <p key={i} className="text-red-700">
                {err.title} {err.code}: {err.detail}
              </p>
            ))}
          <p className="text-gray-600 mt-2 text-sm">Please try again.</p>
        </div>
      </div>
    </div>
  );
}
