import React from "react";
import "./ModelsCard.scss";
import { useNavigate } from "react-router-dom";

const TypesCard = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      title:
        "MULTI V i Наружные блоки VRF воздушного охлаждения (тепловой насос/рекуперация)",
      image:
        "https://lg-b2b.ru/upload/resize_cache/iblock/507/529px80e6xt54kfz19u105b474ghi7oe/210_200_0/MultiVi_UXB_RightSide_.jpg",
    },
    {
      id: 2,
      title:
        "MULTI V 5 Наружные блоки VRF воздушного охлаждения (тепловой насос/рекуперация)",
      image:
        "https://lg-b2b.ru/upload/resize_cache/iblock/f46/210_200_0/vrf-naruzhnye-bloki.jpg",
    },
    {
      id: 3,
      title:
        "MULTI V WATER 4 Наружные блоки VRF водяного охлаждения (тепловой насос)",
      image:
        "https://lg-b2b.ru/upload/resize_cache/iblock/083/210_200_0/vrf_naruzhnye_bloki_vodianogo.jpg",
    },
    {
      id: 4,
      title: "Система рекуперативной вентиляции",
      image:
        "https://lg-b2b.ru/upload/resize_cache/iblock/083/210_200_0/vrf_naruzhnye_bloki_vodianogo.jpg",
    },
    {
      id: 5,
      title: "Мини VRF (воздушного охлаждения)",
      image:
        "https://lg-b2b.ru/upload/resize_cache/iblock/bd6/210_200_0/multivs-1f.jpg",
    },
    {
      id: 6,
      title: "MULTI V S R32 (тепловой насос)",
      image:
        "https://lg-b2b.ru/upload/resize_cache/iblock/bd6/210_200_0/multivs-1f.jpg",
    },
    {
      id: 7,
      title: "Multi V water 5 (тепловой насос/рекуперация)",
      image:
        "https://lg-b2b.ru/upload/resize_cache/iblock/33a/p2fxhgdkj9qn1ryhprfc7taahdr3neu2/210_200_0/Water5_Left_small.jpg",
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
            onClick={() =>
              navigate(`/products?model=${encodeURIComponent(product.title)}`)
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

export default TypesCard;
