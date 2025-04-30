import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const productsContext = React.createContext();

const INIT_STATE = {
  products: [],
  oneProduct: [],
  oneCase: [],
  oneNews: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };
    case "GET_ONE_CASE":
      return { ...state, oneCase: action.payload };
    case "GET_ONE_NEWS":
      return { ...state, oneNews: action.payload };
    default:
      return state;
  }
}

const ProductsContextProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const API = "http://localhost:8000";

  async function getProducts() {
    const { data } = await axios(`http://127.0.0.1:8000/products`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
  }

  async function getOneProduct(slug) {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/products/${slug}`);
      dispatch({
        type: "GET_ONE_PRODUCT",
        payload: res.data, // grab the first matching item
      });
    } catch (err) {
      console.error("Error fetching one product:", err);
    }
  }

  async function getOneCase(id) {
    try {
      const res = await axios.get(`${API}/cases?id=${id}`);
      dispatch({
        type: "GET_ONE_CASE",
        payload: res.data[0],
      });
    } catch (err) {
      console.error("Error fetching one case:", err);
    }
  }

  async function getOneNews(id) {
    try {
      const res = await axios.get(`${API}/news?id=${id}`);
      dispatch({
        type: "GET_ONE_NEWS",
        payload: res.data[0],
      });
    } catch (err) {
      console.error("Error fetching one news:", err);
    }
  }

  async function addCase(formData) {
    try {
      await axios.post(`${API}/cases`, formData);
    } catch (err) {
      console.error(err);
    }
  }

  async function addNews(formData) {
    try {
      await axios.post(`${API}/news`, formData);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <productsContext.Provider
      value={{
        oneProduct: state.oneProduct,
        products: state.products,
        oneCase: state.oneCase,
        oneNews: state.oneNews,

        error,
        getOneNews,
        getOneCase,
        setError,
        getProducts,
        // addProduct,
        getOneProduct,
        addCase,
        addNews,
      }}>
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
