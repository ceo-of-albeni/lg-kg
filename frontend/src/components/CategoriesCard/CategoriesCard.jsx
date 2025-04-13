import React from "react";
import "./CategoriesCard.scss";
import { useNavigate } from "react-router-dom";

const CategoriesCard = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      title: "Мультизональные системы VRF",
      image:
        "https://lg-b2b.ru/local/templates/lg/images/ac/industries/model_6.png",
    },
    {
      id: 2,
      title: "Холодильные машины (Чиллеры)",
      image:
        "https://lg-b2b.ru/local/templates/lg/images/ac/industries/model_1.png",
    },
    {
      id: 3,
      title: "Приточно-Вытяжные Установки (ПВУ)",
      image:
        "https://lg-b2b.ru/local/templates/lg/images/ac/industries/model_2.png",
    },
    {
      id: 4,
      title: "Полупромышленные сплит-системы",
      image:
        "https://lg-b2b.ru/local/templates/lg/images/ac/industries/model_3.png",
    },
    {
      id: 5,
      title: "Полупромышленные Мульти сплит-системы",
      image:
        "https://lg-b2b.ru/local/templates/lg/images/ac/industries/model_5.png",
    },
    {
      id: 6,
      title: "Бытовые сплит-системы",
      image:
        "https://lg-b2b.ru/local/templates/lg/images/ac/industries/model_7.png",
    },
  ];

  return (
    <div className="product-grid">
      <h2 className="grid-title">Продукция</h2>
      <div className="grid-container">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() =>
              navigate(
                `/products?category=${encodeURIComponent(product.title)}`
              )
            }>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-title">{product.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesCard;
