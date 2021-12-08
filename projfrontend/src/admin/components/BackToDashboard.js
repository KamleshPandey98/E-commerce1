import React from "react";
import { Link } from "react-router-dom";

const BackToDashboard = () => {
  return (
    <div className="mt-2">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );
};

export default BackToDashboard;
