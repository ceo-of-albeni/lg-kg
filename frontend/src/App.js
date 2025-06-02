import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Routing from "./Routing";
import ProductsContextProvider from "./contexts/productsContext";
import AuthContextProvider, { authContext } from "./contexts/authContext";
import "./main.css";

const App = () => {
  return (
    <div className="app">
      <AuthContextProvider>
        <ProductsContextProvider>
          <Navbar />
          <Routing />
          <Footer />
        </ProductsContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
