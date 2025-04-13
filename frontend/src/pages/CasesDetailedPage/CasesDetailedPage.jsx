import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./CasesDetailedPage.scss";
import { productsContext } from "../../contexts/productsContext";

const CasesDetailedPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { oneCase, getOneCase } = useContext(productsContext);

  useEffect(() => {
    getOneCase(id);
  }, []);

  if (error) return <div>Проект не найден.</div>;
  if (!oneCase) return <div>Загрузка...</div>;

  return (
    <div className="project-page">
      <div className="hero-section">
        <button className="back-button" onClick={() => navigate("/cases")}>
          <FaArrowLeft />
        </button>
        <h1>{oneCase.title}</h1>
        <p>{oneCase.description}</p>
      </div>

      <div className="content-section">
        <div className="image-container">
          <img src={oneCase.image} alt={oneCase.title} />
        </div>
        <div className="text-container">
          <h2>О проекте</h2>
          <div dangerouslySetInnerHTML={{ __html: oneCase.body }} />
        </div>
      </div>

      <div className="features-section">
        <div className="features-grid">
          <div className="feature-item">Адрес: {oneCase.address}</div>
          <div className="feature-item">Компания: {oneCase.company}</div>
          <div className="feature-item">Дата: {oneCase.date}</div>
        </div>
      </div>
    </div>
  );
};

export default CasesDetailedPage;
