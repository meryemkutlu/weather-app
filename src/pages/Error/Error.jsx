import React from "react";
import { useNavigate } from "react-router-dom";

import ErrorImg from "../../assets/images/error.gif";
import "./Error.css";

function Error() {
  const navigate = useNavigate();
  return (
    <div className="error-section">
      <img src={ErrorImg} alt="" />
      <h1>404 page not found</h1>
      <button className="btn-return" onClick={() => navigate("/")}>
        RETURN TO BASE
      </button>
    </div>
  );
}

export default Error;
