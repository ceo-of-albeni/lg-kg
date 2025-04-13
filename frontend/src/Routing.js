import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import NewsPage from "./pages/NewsPage/NewsPage";
import CasesPage from "./pages/CasesPage/CasesPage";
import CasesDetailedPage from "./pages/CasesDetailedPage/CasesDetailedPage";
import NewsDetailedPage from "./pages/NewsDetailedPage/NewsDetailedPage";
import CategoriesCard from "./components/CategoriesCard/CategoriesCard";
import ProductPage from "./pages/ProductsPage/ProductsPage";
import ProductDetailedPage from "./pages/ProductDetailedPage/ProductDetailedPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import UserPage from "./pages/UserPage/UserPage";
import AdminPage from "./pages/AdminPage/AdminPage";

const Routing = () => {
  const PUBLIC_ROUTES = [
    {
      link: "/",
      element: <HomePage />,
      id: 1,
    },
    {
      link: "/contacts",
      element: <ContactsPage />,
      id: 2,
    },
    {
      link: "/news",
      element: <NewsPage />,
      id: 3,
    },
    {
      link: "/cases",
      element: <CasesPage />,
      id: 4,
    },
    {
      link: "/contacts",
      element: <ContactsPage />,
      id: 5,
    },
    {
      link: "/cases/:id",
      element: <CasesDetailedPage />,
      id: 6,
    },
    {
      link: "/news/:id",
      element: <NewsDetailedPage />,
      id: 7,
    },
    {
      link: "/catag",
      element: <CategoriesCard />,
      id: 8,
    },
    {
      link: "/products/:slug",
      element: <ProductDetailedPage />,
      id: 9,
    },
    {
      link: "/products",
      element: <ProductsPage />,
      id: 10,
    },
    {
      link: "/profile/:id",
      element: <UserPage />,
      id: 11,
    },
    {
      link: "/admin/",
      element: <AdminPage />,
      id: 12,
    },
  ];
  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  );
};

export default Routing;
