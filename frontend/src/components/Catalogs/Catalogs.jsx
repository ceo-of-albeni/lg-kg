import React, { useContext } from "react";
import "./Catalogs.scss";
import { productsContext } from "../../contexts/productsContext";
import { useNavigate } from "react-router-dom";

const Catalogs = () => {
  const navigate = useNavigate();
  const { getCatalogs, catalogs } = useContext(productsContext);
  const catalogs1 = [
    {
      id: 1,
      title: "Сплит и Мульти сплит 2024",
      image:
        "https://lg-b2b.ru/upload/iblock/672/93yuw97n6cesloe35f3ycfghn8wx6v8z/Screenshot-2024_05_08-at-17.35.03.png",
    },
    {
      id: 2,
      title: "Multi V 2024",
      image:
        "https://lg-b2b.ru/upload/iblock/873/w2r6qxgbj9loltrp0msz04ub9j7we9t4/multi_v_2024.jpg",
    },
    {
      id: 3,
      title: "Премиальные кондиционеры",
      image:
        "https://lg-b2b.ru/upload/iblock/ef0/ptsmpsnuz5zpp4ljbyxvkbumf6rc5wyu/Premium_2024_compressed.jpg",
    },
    {
      id: 4,
      title: "Чиллеры LG 2020",
      image: "https://lg-b2b.ru/upload/iblock/878/Chiller2020.jpg",
    },
  ];

  return (
    <div className="catalogs">
      <h2 className="catalogs-title">Каталоги</h2>
      <p className="catalogs-description">
        Здесь вы можете посмотреть и скачать коммерческие каталоги нашей
        продукции по всем системам VRF, сплит системам и чиллерам.
      </p>
      <div className="catalogs-container">
        {catalogs1.map((catalog) => (
          <div key={catalog.id} className="catalog-card">
            <img
              src={catalog.image}
              alt={catalog.title}
              className="catalog-image"
            />
            <div className="catalog-title">{catalog.title}</div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/catalogs")} className="view-all-button">
        Посмотреть все
      </button>
    </div>
  );
};

export default Catalogs;
