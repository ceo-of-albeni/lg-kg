import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import NewsPage from "./pages/NewsPage/NewsPage";
import CasesPage from "./pages/CasesPage/CasesPage";
import CasesDetailedPage from "./pages/CasesDetailedPage/CasesDetailedPage";
import NewsDetailedPage from "./pages/NewsDetailedPage/NewsDetailedPage";
import ProductDetailedPage from "./pages/ProductDetailedPage/ProductDetailedPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import UserPage from "./pages/UserPage/UserPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import TypesPage from "./pages/TypesPage/TypesPage";
import ModelPage from "./pages/ModelPage/ModelPage";
import CatalogsPage from "./pages/CatalogsPage/CatalogsPage";

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
      link: "/cases/:id",
      element: <CasesDetailedPage />,
      id: 5,
    },
    {
      link: "/news/:id",
      element: <NewsDetailedPage />,
      id: 6,
    },
    {
      link: "/categories",
      element: <CategoriesPage />,
      id: 7,
    },
    {
      link: "/products/:slug",
      element: <ProductDetailedPage />,
      id: 8,
    },
    {
      link: "/products",
      element: <ProductsPage />,
      id: 9,
    },
    {
      link: "/profile/:id",
      element: <UserPage />,
      id: 10,
    },
    {
      link: "/admin",
      element: <AdminPage />,
      id: 11,
    },
    {
      link: "/types",
      element: <TypesPage />,
      id: 12,
    },
    {
      link: "/model",
      element: <ModelPage />,
      id: 13,
    },
    {
      link: "/catalogs",
      element: <CatalogsPage />,
      id: 14,
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
