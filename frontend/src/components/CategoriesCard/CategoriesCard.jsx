import React, { useContext, useEffect } from "react";
import "./CategoriesCard.scss";
import { useNavigate } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";

const CategoriesCard = () => {
  const navigate = useNavigate();
  const { getProducts, products } = useContext(productsContext);

  useEffect(() => {
    getProducts();
    console.log(products);
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="product-grid">
      <div className="grid-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className="product-card"
            onClick={() =>
              navigate(`/types?category=${encodeURIComponent(category)}`)
            }>
            <img
              src="https://lg-b2b.ru/local/templates/lg/images/ac/industries/model_6.png" // Static image for now, can be replaced later
              alt={category}
              className="product-image"
            />
            <div className="product-title">{category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesCard;
