import React, { useContext, useEffect, useState } from "react";
import "./NewsPage.scss";
import { useNavigate } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";

const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 9;
  const navigate = useNavigate();
  const { getNews, news } = useContext(productsContext);

  useEffect(() => {
    getNews();
  }, []);

  // Calculate indexes for slicing articles
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="news-page">
      <div className="news-container">
        <h1>Новости</h1>
        <div className="news-grid">
          {currentNews?.map((oneNews, index) => (
            <div key={index} className="news-card">
              <img
                src={oneNews.image}
                alt={oneNews.title}
                className="news-image"
              />
              <div className="news-content">
                <h2>{oneNews.title}</h2>
                <span className="news-date">{oneNews.date}</span>
                <p>
                  {oneNews.description.split(" ").slice(0, 10).join(" ")}
                  {oneNews.description.split(" ").length > 10 && "..."}{" "}
                  <a
                    style={{ color: "#b30021" }}
                    onClick={() => navigate(`/news/${oneNews.id}`)}>
                    Читать далее
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          {Array.from({
            length: Math.ceil(news.length / newsPerPage),
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

export default NewsPage;
