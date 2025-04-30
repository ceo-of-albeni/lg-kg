import React from "react";
import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import ModelsCard from "../../components/ModelsCard/ModelsCard";
import "./ModelPage.scss";

const ModelPage = () => {
  return (
    <div className="types_container">
      <h1>Продукция</h1>
      <ModelsCard />
    </div>
  );
};

export default ModelPage;
