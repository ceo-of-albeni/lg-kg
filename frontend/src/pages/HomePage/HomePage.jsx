import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import "./HomePage.scss";
import HomeCards from "../../components/HomeCards/HomeCards";
import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import Catalogs from "../../components/Catalogs/Catalogs";

const HomePage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("verified") === "true") {
      setOpenSnackbar(true);
      // Optionally remove the param from URL without reload
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Ваш email подтвержден, теперь вы можете войти.
        </Alert>
      </Snackbar>

      <div className="home-banner">
        <div className="overlay" />
        <img
          src="https://www.binaryversion.pt/wp-content/uploads/lg.png"
          alt="LG Logo"
          className="banner-logo"
        />
      </div>
      <div className="container">
        <h2>Отраслевые решения</h2>
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
          <h2>Продукция</h2>
          <CategoriesCard />
        </div>
        <div>
          <Catalogs />
        </div>
      </div>
      <div className="video-div">
        <video
          controls
          type="video/mp4"
          autoPlay
          muted
          src="https://lg-b2b.ru/upload/video-main.mp4"></video>
      </div>
    </>
  );
};

export default HomePage;
