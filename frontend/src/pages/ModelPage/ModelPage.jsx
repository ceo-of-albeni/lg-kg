import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import ModelsCard from "../../components/ModelsCard/ModelsCard";
import { productsContext } from "../../contexts/productsContext";
import "./ModelPage.scss";

const ModelPage = () => {
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const selectedType = searchParams.get("type");

  const { products } = useContext(productsContext);

  useEffect(() => {
    // Check if products are loaded and selected parameters are available
    if (selectedCategory && selectedType && products.length > 0) {
      const models = products.filter(
        (product) =>
          product.category.name === selectedCategory &&
          product.type.name === selectedType
      );
      setFilteredModels(models);
    }
  }, []); //selectedCategory, selectedType, products

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
      <div className="types_container">
        <h1>Модели продукции</h1>
        {filteredModels.length > 0 ? (
          <ModelsCard models={filteredModels} />
        ) : (
          <p>No models found for the selected category and type.</p>
        )}
      </div>
    </>
  );
};

export default ModelPage;
