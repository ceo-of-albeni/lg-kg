import React, { useState, useContext, useRef, useEffect } from "react";
import "./Navbar.scss";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../../images/LG-logo.webp";
import { useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";
import { authContext } from "../../contexts/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, handleLogout } = useContext(authContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  console.log(currentUser);

  const goToProfile = () => {
    if (currentUser && currentUser.pk) {
      navigate(`/profile/${currentUser.pk}`);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div onClick={() => navigate("/")} className="navbar-left">
          <img src={Logo} alt="LG Business Solutions" className="logo" />
        </div>

        <ul className="nav-links">
          <li onClick={() => navigate("/")}>ГЛАВНАЯ</li>
          <li onClick={() => navigate("/categories")}>
            СИСТЕМЫ КОНДИЦИОНИРОВАНИЯ
          </li>
          <li onClick={() => navigate("/contacts")}>КОНТАКТЫ</li>
          {/* <li onClick={() => navigate("/admin")}>АДМИН</li> */}
        </ul>

        <div className="navbar-right">
          <button className="outline-button" onClick={() => navigate(`/news`)}>
            Новости
          </button>
          <button className="outline-button" onClick={() => navigate(`/cases`)}>
            Кейсы
          </button>

          {!currentUser ? (
            <button
              className="outline-button"
              onClick={() => setIsModalOpen(true)}>
              Войти
            </button>
          ) : (
            <div className="user-dropdown" ref={dropdownRef}>
              <FaUserCircle
                className="user-icon"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      goToProfile();
                      setDropdownOpen(false);
                    }}>
                    Мой профиль
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}>
                    Выйти
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {isModalOpen && <LoginModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Navbar;
