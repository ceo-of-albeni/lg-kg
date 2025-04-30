import React from "react";
import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import "./CategoriesPage.scss";

const CategoriesPage = () => {
  return (
    <div className="categories_container">
      <h1>Продукция</h1>
      <CategoriesCard />
    </div>
  );
};

export default CategoriesPage;
