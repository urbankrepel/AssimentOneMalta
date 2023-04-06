import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = React.lazy(() => import("./pages/login/Login"));
const ClientFormList = React.lazy(
  () => import("./pages/admin/clientFormList/ClientFormList")
);
const ClientForm = React.lazy(() => import("./pages/clientForm/ClientForm"));
const TemplateList = React.lazy(
  () => import("./pages/admin/templateList/TemplateList")
);
const ViewClientsForm = React.lazy(
  () => import("./pages/admin/viewClientsForm/ViewClientsForm")
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/client-form-list" element={<ClientFormList />} />
          <Route path="/client-form" element={<ClientForm />} />
          <Route path="/template-list" element={<TemplateList />} />
          <Route path="/client-form-view/:id" element={<ViewClientsForm />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </Suspense>
  );
}

export default App;
