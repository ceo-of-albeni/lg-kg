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
            key={model.id}
            className="product-card"
            onClick={() =>
              navigate(
                `/products?model=${encodeURIComponent(model.product_model)}`
              )
            }>
            <img
              src={model.image}
              alt={model.product_model}
              className="product-image"
            />
            <div className="product-title">{model.product_model}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelsCard;
