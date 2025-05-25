import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Importing an arrow icon from react-icons
import "./NewsDetailedPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";

const NewsDetailedPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { oneNews, getOneNews } = useContext(productsContext);

  useEffect(() => {
    getOneNews(id);
    console.log(oneNews);
  }, []);

  if (error) return <div>Новость не найдена.</div>;
  if (!oneNews) return <div>Загрузка...</div>;

  return (
    <div className="project-page">
      <div className="hero-section">
        <button className="back-button" onClick={() => navigate("/news")}>
          <FaArrowLeft />
        </button>
        <h1>{oneNews.title}</h1>
        <p>{oneNews.description}</p>
      </div>

      <div className="content-section">
        <div className="image-container">
          <img src={oneNews.image} alt={oneNews.title} />
        </div>
        <div className="text-container">
          <div dangerouslySetInnerHTML={{ __html: oneNews.body }} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetailedPage;
