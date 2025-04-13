import React, { useEffect, useState } from "react";
import "./CasesPage.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:8000";

const CasesPage = () => {
  const [cases, setCases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const casesPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get(`${API}/cases`);
        setCases(res.data.reverse()); // Show newest first (optional)
      } catch (error) {
        console.error("Ошибка при загрузке кейсов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = cases.slice(indexOfFirstCase, indexOfLastCase);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="cases-page">
      <div className="cases-container">
        <h1>Успешные проекты</h1>
        <div className="cases-grid">
          {currentCases.map((caseItem) => (
            <div key={caseItem.id} className="cases-card">
              <img
                src={caseItem.image}
                alt={caseItem.title}
                className="cases-image"
              />
              <div className="cases-content">
                <h2>{caseItem.title}</h2>
                <span className="cases-date">{caseItem.date}</span>
                <p>
                  {caseItem.description.split(" ").slice(0, 10).join(" ")}
                  {caseItem.description.split(" ").length > 10 && "..."}{" "}
                  <a
                    style={{ color: "#b30021" }}
                    onClick={() => navigate(`/cases/${caseItem.id}`)}>
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
            length: Math.ceil(cases.length / casesPerPage),
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

export default CasesPage;
