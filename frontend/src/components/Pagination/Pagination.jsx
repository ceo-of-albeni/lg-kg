import React from "react";
import "./Pagination.scss";
import { useNavigate } from "react-router-dom";
const Pagination = () => {
  const navigate = useNavigate();

  return (
    <div className="pagination-container">
      <button onClick={() => navigate("/rules1")} id="pagination_btn">
        1
      </button>
      <button onClick={() => navigate("/rules2")} id="pagination_btn">
        2
      </button>
      <button onClick={() => navigate("/rules3")} id="pagination_btn">
        3
      </button>
      <button onClick={() => navigate("/rules4")} id="pagination_btn">
        4
      </button>
    </div>
  );
};

export default Pagination;
