import React, { useContext, useEffect } from "react";
import "./Catalogs.scss";
import { productsContext } from "../../contexts/productsContext";
import { useNavigate } from "react-router-dom";

const Catalogs = () => {
  const navigate = useNavigate();
  const { getCatalogs, catalogs } = useContext(productsContext);

  useEffect(() => {
    getCatalogs();
  }, []);

  return (
    <div className="catalogs">
      <h2 className="catalogs-title">Каталоги</h2>
      <p className="catalogs-description">
        Здесь вы можете посмотреть и скачать коммерческие каталоги нашей
        продукции по всем системам VRF, сплит системам и чиллерам.
      </p>
      <div className="catalogs-container">
        {catalogs
          .slice(-4)
          .reverse()
          .map((catalog) => (
            <div key={catalog.id} className="catalog-card">
              <a href={catalog.file_link} target="_blank">
                <img
                  src={catalog.cover}
                  alt={catalog.title}
                  className="catalog-image"
                />
              </a>
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
