import React from "react";
import { Link } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/client-form-list">
              Client Form List
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/template-list">
              Template List
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavBar;
