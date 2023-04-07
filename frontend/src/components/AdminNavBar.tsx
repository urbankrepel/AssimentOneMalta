import React from "react";
import { Link } from "react-router-dom";
import { fetchAdminLogout } from "../api/admin";
import useAlert from "../hooks/useAlert";

interface Props {
  reload: () => void;
}

const AdminNavBar = ({ reload }: Props) => {
  const { show } = useAlert();

  const logout = async () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;
    const logoutPromise = fetchAdminLogout();
    await show(logoutPromise, "Loading...", "Logout Success");
    reload();
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light mw-100"
      style={{ paddingRight: "20px" }}
    >
      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent"
      >
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
        <button
          type="button"
          className="btn btn-danger my-2 my-lg-0"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavBar;
