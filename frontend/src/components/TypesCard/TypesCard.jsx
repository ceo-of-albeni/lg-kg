import React from "react";
import "./TypesCard.scss";
import { useNavigate } from "react-router-dom";

const TypesCard = ({ types }) => {
  const navigate = useNavigate();

  if (!types || types.length === 0) {
    return <div>No types available</div>;
  }

  return (
    <div className="product-grid">
      <div className="grid-container">
        {types.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => {
              navigate(
                `/model?category=${encodeURIComponent(
                  product.category
                )}&type=${encodeURIComponent(product.type)}`
              );
            }}>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-title">{product.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypesCard;
