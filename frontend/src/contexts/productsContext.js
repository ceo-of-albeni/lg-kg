import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const productsContext = React.createContext();

const INIT_STATE = {
  products: [],
  oneProduct: [],
  cases: [],
  oneCase: [],
  news: [],
  oneNews: [],
  orders: [],
  oneOrder: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };
    case "GET_CASES":
      return { ...state, cases: action.payload };
    case "GET_ONE_CASE":
      return { ...state, oneCase: action.payload };
    case "GET_NEWS":
      return { ...state, news: action.payload };
    case "GET_ONE_NEWS":
      return { ...state, oneNews: action.payload };
    case "GET_ORDERS":
      return { ...state, orders: action.payload };
    case "GET_ONE_ORDER":
      return { ...state, oneOrder: action.payload };
    default:
      return state;
  }
}

const ProductsContextProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const API = "http://127.0.0.1:8000";

  async function getProducts() {
    const { data } = await axios(`${API}/products`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
  }

  async function getOneProduct(slug) {
    try {
      const res = await axios.get(`${API}/products/${slug}`);
      dispatch({
        type: "GET_ONE_PRODUCT",
        payload: res.data,
      });
    } catch (err) {
      console.error("Error fetching one product:", err);
    }
  }

  async function getCases() {
    const { data } = await axios(`${API}/cases`);
    dispatch({
      type: "GET_CASES",
      payload: data,
    });
  }

  async function getOneCase(id) {
    try {
      const res = await axios.get(`${API}/cases/${id}`);
      dispatch({
        type: "GET_ONE_CASE",
        payload: res.data,
      });
    } catch (err) {
      console.error("Error fetching one case:", err);
    }
  }

  async function getNews() {
    const { data } = await axios(`${API}/news`);
    dispatch({
      type: "GET_NEWS",
      payload: data,
    });
    console.log(data);
  }

  async function getOneNews(id) {
    try {
      const res = await axios.get(`${API}/news/${id}`);
      dispatch({
        type: "GET_ONE_NEWS",
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching one news:", err);
    }
  }

  async function getOrders() {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const Authorization = `Bearer ${tokens.access_token}`;
    const config = {
      headers: {
        Authorization,
      },
    };
    const { data } = await axios(`${API}/orders`, config);
    dispatch({
      type: "GET_ORDERS",
      payload: data,
    });
    console.log(data);
  }

  async function getOneOrder(id) {
    try {
      const res = await axios.get(`${API}/orders/${id}`);
      dispatch({
        type: "GET_ONE_ORDER",
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching one order:", err);
    }
  }

  async function postOrder(newObj) {
    try {
      const res = await axios.post(`${API}/orders`, newObj);
      console.log("Order created:", res.data);
    } catch (err) {
      setError(true);
      if (err.response) {
        console.error("Error:", err.response.data);
      } else {
        console.error("Unknown error:", err);
      }
    }
  }

  return (
    <productsContext.Provider
      value={{
        oneProduct: state.oneProduct,
        products: state.products,
        oneCase: state.oneCase,
        cases: state.cases,
        oneNews: state.oneNews,
        news: state.news,
        oneOrder: state.oneOrder,
        orders: state.orders,

        error,
        getNews,
        getOneNews,
        getCases,
        getOneCase,
        setError,
        getProducts,
        getOneProduct,
        getOrders,
        getOneOrder,
        postOrder,
      }}>
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
