import React, { useContext, useEffect, useState } from "react";
import "./CatalogsPage.scss";
import { productsContext } from "../../contexts/productsContext";

const CatalogsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const catalogsPerPage = 9;
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
    {
      id: 5,
      title: "Сплит и Мульти сплит 2024",
      image:
        "https://lg-b2b.ru/upload/iblock/672/93yuw97n6cesloe35f3ycfghn8wx6v8z/Screenshot-2024_05_08-at-17.35.03.png",
    },
    {
      id: 6,
      title: "Multi V 2024",
      image:
        "https://lg-b2b.ru/upload/iblock/873/w2r6qxgbj9loltrp0msz04ub9j7we9t4/multi_v_2024.jpg",
    },
    {
      id: 7,
      title: "Премиальные кондиционеры",
      image:
        "https://lg-b2b.ru/upload/iblock/ef0/ptsmpsnuz5zpp4ljbyxvkbumf6rc5wyu/Premium_2024_compressed.jpg",
    },
    {
      id: 8,
      title: "Чиллеры LG 2020",
      image: "https://lg-b2b.ru/upload/iblock/878/Chiller2020.jpg",
    },
    {
      id: 9,
      title: "Сплит и Мульти сплит 2024",
      image:
        "https://lg-b2b.ru/upload/iblock/672/93yuw97n6cesloe35f3ycfghn8wx6v8z/Screenshot-2024_05_08-at-17.35.03.png",
    },
    {
      id: 10,
      title: "Multi V 2024",
      image:
        "https://lg-b2b.ru/upload/iblock/873/w2r6qxgbj9loltrp0msz04ub9j7we9t4/multi_v_2024.jpg",
    },
    {
      id: 11,
      title: "Премиальные кондиционеры",
      image:
        "https://lg-b2b.ru/upload/iblock/ef0/ptsmpsnuz5zpp4ljbyxvkbumf6rc5wyu/Premium_2024_compressed.jpg",
    },
    {
      id: 12,
      title: "Чиллеры LG 2020",
      image: "https://lg-b2b.ru/upload/iblock/878/Chiller2020.jpg",
    },
  ];

  useEffect(() => {
    getCatalogs();
    console.log(catalogs);
  }, []);

  const indexOfLastCatalog = currentPage * catalogsPerPage;
  const indexOfFirstCatalog = indexOfLastCatalog - catalogsPerPage;
  const currentCatalogs = catalogs1.slice(
    indexOfFirstCatalog,
    indexOfLastCatalog
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="catalogs-page">
      <div className="catalogs-container">
        <div className="catalogs">
          <h1 className="catalogs-title">Каталоги</h1>
          <p className="catalogs-description">
            Здесь вы можете посмотреть и скачать коммерческие каталоги нашей
            продукции по всем системам VRF, сплит системам и чиллерам.
          </p>
          <div className="catalogs-container">
            {currentCatalogs.map((catalog) => (
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
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          {Array.from({
            length: Math.ceil(catalogs1.length / catalogsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogsPage;
