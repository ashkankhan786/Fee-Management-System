import React from "react";

function StudentCard({ s }) {
  return (
    <div>
      <div
        key={s._id}
        className="bg-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
      >
        <h3 className="text-xl font-bold text-gray-600">{s.name}</h3>
        <p className="text-sm text-gray-400 mt-1">{s.email}</p>
        <p className="text-sm mt-4 text-gray-600">
          <span className="font-semibold text-gray-600">Fees Paid:</span>{" "}
          {s.feesPaid ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}

export default StudentCard;
