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
      console.log("Selected Category:", selectedCategory);
      console.log("Selected Type:", selectedType);
      console.log("All Products:", products);

      const models = products.filter(
        (product) =>
          product.category === selectedCategory && product.type === selectedType
      );
      console.log("Filtered Models:", models);
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
