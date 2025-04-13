import React, { useEffect, useState } from "react";
import "./NewsPage.scss";
import Logo from "../../images/LG-logo.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:8000";

const newsArticles = [
  {
    title: "LG Представила Новую Линию Кондиционеров",
    date: "15 Февраля 2025",
    description: "Компания LG анонсировала новую серию кондиционеров...",
    image: "https://i.ytimg.com/vi/iFkTTecz814/maxresdefault.jpg",
  },
  {
    title: "Новые Решения Для Бизнеса от LG",
    date: "10 Февраля 2025",
    description:
      "LG расширяет свою линейку решений для корпоративных клиентов...",
    image: Logo,
  },
  {
    title: "Инновации LG в Промышленном Оборудовании",
    date: "5 Февраля 2025",
    description:
      "LG представила передовые решения для промышленных предприятий...",
    image: Logo,
  },
  {
    title: "LG Улучшила Технологии AI",
    date: "2 Февраля 2025",
    description: "Новые модели AI-интегрированных устройств от LG...",
    image: Logo,
  },
  {
    title: "LG Поддерживает Зеленые Технологии",
    date: "28 Января 2025",
    description: "Компания LG активно развивает экологичные технологии...",
    image: Logo,
  },
  {
    title: "Обновление Линейки Смарт-ТВ",
    date: "22 Января 2025",
    description: "LG выпустила новые модели смарт-телевизоров с AI...",
    image: Logo,
  },
];

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${API}/news`);
        setNews(res.data.reverse());
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    };

    fetchNews();
  }, []);

  // Calculate indexes for slicing articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="news-page">
      <div className="news-container">
        <h1>Новости</h1>
        <div className="news-grid">
          {currentArticles.map((article, index) => (
            <div key={index} className="news-card">
              <img
                src={article.image}
                alt={article.title}
                className="news-image"
              />
              <div className="news-content">
                <h2>{article.title}</h2>
                <span className="news-date">{article.date}</span>
                <p>
                  {article.description.split(" ").slice(0, 10).join(" ")}
                  {article.description.split(" ").length > 10 && "..."}{" "}
                  <a
                    style={{ color: "#b30021" }}
                    onClick={() => navigate(`/news/${article.id}`)}>
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
            length: Math.ceil(newsArticles.length / articlesPerPage),
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
