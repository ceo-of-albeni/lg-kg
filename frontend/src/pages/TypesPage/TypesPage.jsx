import React, { useContext, useEffect, useState } from "react";
import "./TypesPage.scss";
import TypesCard from "../../components/TypesCard/TypesCard";
import { useSearchParams } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";

const TypesPage = () => {
  const [types, setTypes] = useState([]);
  const { products } = useContext(productsContext);

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    if (selectedCategory) {
      // Filter types based on selected category
      const filteredTypes = products.filter(
        (product) => product.category === selectedCategory
      );
      setTypes(filteredTypes);
    }
  }, []); //selectedCategory, products

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
        <h1>Типы продукции</h1>
        <TypesCard types={types} />
      </div>
    </>
  );
};

export default TypesPage;
