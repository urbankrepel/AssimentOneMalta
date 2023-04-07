import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchAdmin } from "../api/admin";

const AdminRoute = () => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  const chechLoggedIn = async () => {
    const response = await fetchAdmin();
    if (response.status === 200) {
      setLoggedIn(true);
    }
  };

  React.useEffect(() => {
    chechLoggedIn();
  }, []);

  const TemplateList = React.lazy(
    () => import("../pages/admin/templateList/TemplateList")
  );
  const ViewClientsForm = React.lazy(
    () => import("../pages/admin/viewClientsForm/ViewClientsForm")
  );
  const ClientFormList = React.lazy(
    () => import("../pages/admin/clientFormList/ClientFormList")
  );
  const Login = React.lazy(() => import("../pages/login/Login"));
  const AdminNavBar = React.lazy(() => import("../components/AdminNavBar"));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loggedIn ? (
        <>
          <AdminNavBar />
          <Routes>
            <Route path="/client-form-list" element={<ClientFormList />} />
            <Route path="/template-list" element={<TemplateList />} />
            <Route
              path="/client-form-view/:template_id/:client_id"
              element={<ViewClientsForm />}
            />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </Suspense>
  );
};

export default AdminRoute;
