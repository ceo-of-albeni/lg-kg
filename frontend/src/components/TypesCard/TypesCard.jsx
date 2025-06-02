import React from "react";
import "./TypesCard.scss";
import { useNavigate } from "react-router-dom";

const TypesCard = ({ types }) => {
  const navigate = useNavigate();

  if (!types || types.length === 0) {
    return <div>No types available</div>;
  }
  console.log(types);

  return (
    <div className="product-grid">
      <div className="grid-container">
        {types.map((product) => (
          <div
            key={product.slug}
            className="product-card"
            onClick={() => {
              navigate(
                `/model?category=${encodeURIComponent(
                  product.category?.name
                )}&type=${encodeURIComponent(product.type?.name)}`
              );
            }}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-title">{product.type?.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypesCard;
