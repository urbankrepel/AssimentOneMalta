import React from "react";
import "./ViewClientsForm.css";
import { useParams } from "react-router-dom";

const ViewClientsForm = () => {
  const { id } = useParams();
  return <div>View Client {id}</div>;
};

export default ViewClientsForm;
