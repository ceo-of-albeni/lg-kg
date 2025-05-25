import React from "react";
import "./TypesPage.scss";
import TypesCard from "../../components/TypesCard/TypesCard";

const TypesPage = () => {
  return (
    <div className="types_container">
      <h1>Продукция</h1>
      <TypesCard />
    </div>
  );
};

export default TypesPage;
