import React, { useContext, useEffect, useState } from "react";
import "./CatalogsPage.scss";
import { productsContext } from "../../contexts/productsContext";

const CatalogsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const catalogsPerPage = 9;
  const { getCatalogs, catalogs } = useContext(productsContext);

  useEffect(() => {
    getCatalogs();
  }, []);

  const indexOfLastCatalog = currentPage * catalogsPerPage;
  const indexOfFirstCatalog = indexOfLastCatalog - catalogsPerPage;
  const currentCatalogs = catalogs.slice(
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
            <strong>Примечание: </strong> Исходя из политики компании
            постоянного развития и улучшения технологий, некоторые данные
            технических характеристик, содержащиеся в представленных каталогах,
            могут быть изменены без предварительного уведомления.
          </p>
          <div className="catalogs-container">
            {currentCatalogs.map((catalog) => (
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
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          {Array.from({
            length: Math.ceil(catalogs.length / catalogsPerPage),
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
