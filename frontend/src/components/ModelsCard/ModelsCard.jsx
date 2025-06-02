import React from "react";
import "./ModelsCard.scss";
import { useNavigate } from "react-router-dom";

const ModelsCard = ({ models }) => {
  const navigate = useNavigate();

  if (models.length === 0) {
    return <p>No models found for the selected category and type.</p>;
  }

  return (
    <div className="product-grid">
      <div className="grid-container">
        {models.map((model) => (
          <div
            key={model.slug}
            className="product-card"
            onClick={() =>
              navigate(
                `/products?model=${encodeURIComponent(
                  model.product_model.name
                )}`
              )
            }>
            <img
              src={model.product_model.image}
              alt={model.product_model.name}
              className="product-image"
            />
            <div className="product-title">{model.product_model.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelsCard;
