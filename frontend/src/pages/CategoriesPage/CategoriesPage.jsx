import React from "react";
import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import "./CategoriesPage.scss";

const CategoriesPage = () => {
  return (
    <>
      <div className="products-banner">
        <div className="overlay" />
        <img
          src="https://www.binaryversion.pt/wp-content/uploads/lg.png"
          alt="LG Logo"
          className="banner-logo"
        />
      </div>
      <div className="categories_container">
        <h1>Продукция</h1>
        <CategoriesCard />
      </div>
    </>
  );
};

export default CategoriesPage;
