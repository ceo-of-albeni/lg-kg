import React from "react";
import "./HomeCards.scss";

const HomeCards = () => {
  const cards = [
    {
      id: 1,
      title: "ДЕЛОВЫЕ ПРОСТРАНСТВА",
      image:
        "https://lg-b2b.ru/local/templates/lg/images/main/industries/business-spaces.jpg",
    },
    {
      id: 2,
      title: "ОТЕЛИ",
      image:
        "https://lg-b2b.ru/local/templates/lg/images/main/industries/hotels.jpg",
    },
    {
      id: 3,
      title: "ТРАНСПОРТ",
      image:
        "https://lg-b2b.ru/local/templates/lg/images/main/industries/transport.jpg",
    },
    {
      id: 4,
      title: "ЖИЛОЙ ФОНД",
      image:
        "https://lg-b2b.ru/local/templates/lg/images/main/industries/housing-stock.jpg",
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card) => (
        <div key={card.id} className="card">
          <img src={card.image} alt={card.title} className="card-image" />
          <div className="card-title">{card.title}</div>
        </div>
      ))}
    </div>
  );
};

export default HomeCards;
