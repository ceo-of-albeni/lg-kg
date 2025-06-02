import React, { useState, useContext, useRef, useEffect } from "react";
import "./Navbar.scss";
import { FaUserCircle, FaSearch } from "react-icons/fa"; // import FaSearch
import Logo from "../../images/LG-logo.webp";
import { useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";
import { authContext } from "../../contexts/authContext";
import { productsContext } from "../../contexts/productsContext"; // import products context
import { FaBars, FaTimes } from "react-icons/fa"; // Add hamburger and close icons

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, handleLogout } = useContext(authContext);
  const { products, getProducts } = useContext(productsContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdown on outside click (user icon)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchTerm("");
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch products if not already loaded
  useEffect(() => {
    if (!products || products.length === 0) {
      getProducts();
    }
  }, [products, getProducts]);

  // Filter products as user types
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 5)); // limit results to 5
  }, [searchTerm, products]);

  const goToProfile = () => {
    if (currentUser && currentUser.pk) {
      navigate(`/profile/${currentUser.pk}`);
    }
  };

  const handleProductClick = (slug) => {
    setSearchOpen(false);
    setSearchTerm("");
    setSearchResults([]);
    navigate(`/products/${slug}`);
  };

  return (
    <>
      <nav className="navbar">
        <div onClick={() => navigate("/")} className="navbar-left">
          <img src={Logo} alt="LG Business Solutions" className="logo" />
        </div>

        {/* Hamburger icon for mobile */}
        <div
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop navigation */}
        <ul className="nav-links desktop">
          <li onClick={() => navigate("/")}>ГЛАВНАЯ</li>
          <li onClick={() => navigate("/categories")}>
            СИСТЕМЫ КОНДИЦИОНИРОВАНИЯ
          </li>
          <li onClick={() => navigate("/contacts")}>КОНТАКТЫ</li>
        </ul>

        {/* Mobile navigation menu */}
        <div className={`mobile-menu-wrapper ${mobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-links mobile">
            <li
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}>
              ГЛАВНАЯ
            </li>
            <li
              onClick={() => {
                navigate("/categories");
                setMobileMenuOpen(false);
              }}>
              СИСТЕМЫ КОНДИЦИОНИРОВАНИЯ
            </li>
            <li
              onClick={() => {
                navigate("/contacts");
                setMobileMenuOpen(false);
              }}>
              КОНТАКТЫ
            </li>
          </ul>

          <div className="navbar-right mobile">
            <div className="search-wrapper" ref={searchRef}>
              <FaSearch
                className="search-icon"
                onClick={() => setSearchOpen((prev) => !prev)}
                title="Поиск продуктов"
              />
              {searchOpen && (
                <div className="search-dropdown">
                  <input
                    type="text"
                    placeholder="Поиск продуктов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  {searchResults.length > 0 && (
                    <ul className="search-results">
                      {searchResults.map((product) => (
                        <li
                          key={product.pk || product.id}
                          onClick={() => handleProductClick(product.slug)}>
                          {product.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  {searchTerm && searchResults.length === 0 && (
                    <div className="no-results">Нет результатов</div>
                  )}
                </div>
              )}
            </div>

            <button
              className="outline-button"
              onClick={() => navigate(`/news`)}>
              Новости
            </button>

            <button
              className="outline-button"
              onClick={() => navigate(`/cases`)}>
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
        </div>

        <div className="navbar-right">
          {/* Search icon next to Новости */}
          <div className="search-wrapper" ref={searchRef}>
            <FaSearch
              className="search-icon"
              onClick={() => setSearchOpen((prev) => !prev)}
              title="Поиск продуктов"
            />

            {searchOpen && (
              <div className="search-dropdown">
                <input
                  type="text"
                  placeholder="Поиск продуктов..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                {searchResults.length > 0 && (
                  <ul className="search-results">
                    {searchResults.map((product) => (
                      <li
                        key={product.pk || product.id}
                        onClick={() => handleProductClick(product.slug)}>
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
                {searchTerm && searchResults.length === 0 && (
                  <div className="no-results">Нет результатов</div>
                )}
              </div>
            )}
          </div>
          {/* Новости button */}
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
