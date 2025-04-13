import React from "react";
import "./HomePage.scss";
import HomeCards from "../../components/HomeCards/HomeCards";
import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import Catalogs from "../../components/Catalogs/Catalogs";

const HomePage = () => {
  return (
    <>
      <div className="container">
        <h1>Отраслевые решения</h1>
        <p>
          LG предлагает оптимизированные решения HVAC для всех климатических
          потребностей,
          <br />
          обеспечивая свежий воздух для различных бизнес-сред. LG произведет
          революцию в способах ведения бизнеса.
        </p>
        <div className="where_cards-container">
          <HomeCards />
        </div>
        <div className="categories">
          <CategoriesCard />
        </div>
        <div>
          <Catalogs />
        </div>
        <div className="video-div">
          <video
            controls
            type="video/mp4"
            autoPlay
            muted
            src="https://lg-b2b.ru/upload/video-main.mp4"></video>
        </div>
      </div>
    </>
  );
}
export default HomePage;
