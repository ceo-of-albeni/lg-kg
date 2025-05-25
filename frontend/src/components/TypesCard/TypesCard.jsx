import React from "react";
import "./TypesCard.scss";
import { useNavigate } from "react-router-dom";

const TypesCard = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      title: "MULTI V Наружные блоки VRF",
      image:
        "https://lg-b2b.ru/upload/resize_cache/iblock/6ac/210_200_0/vrf-naruzhnye-bloki.jpg",
    },
    {
      id: 2,
      title: "Внутренние блоки",
      image:
        "https://lg-b2b.ru/upload/resize_cache/iblock/172/210_200_0/vrf-vnutrennie-bloki.jpg",
    },
    {
      id: 3,
      title: "Горячее водоснабжение (ГВС)",
      image:
        "https://lg-b2b.ru/upload/resize_cache/iblock/51d/210_200_0/goryachee-vodosnabzhenie-gvs.jpg",
    },
    {
      id: 4,
      title: "Система рекуперативной вентиляции",
      image:
        "https://lg-b2b.ru/upload/resize_cache/iblock/406/210_200_0/erv.jpg",
    },
    {
      id: 5,
      title: "Системы управления и доп. оборудование",
      image:
        "https://lg-b2b.ru/upload/resize_cache/iblock/265/210_200_0/pacs4b000.jpg",
    },
  ];

  return (
    <div className="product-grid">
      {/* <h2 className="grid-title">Продукция</h2> */}
      <div className="grid-container">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/model`)}>
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

export default TypesCard;
