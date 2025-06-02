import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authAxios from "./authAxios";

export const authContext = React.createContext();

const INIT_STATE = {
  users: [],
  oneUser: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "GET_ONE_USER":
      return { ...state, oneUser: action.payload };
    default:
      return state;
  }
}

const API = "http://127.0.0.1:8000";

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setAuthLoading(false);
  }, []);

  const refreshAccessToken = async () => {
    const refreshToken = JSON.parse(localStorage.getItem("tokens_refresh"));
    if (!refreshToken) return null;

    try {
      const res = await axios.post(`${API}/auth/token/refresh/`, {
        refresh: refreshToken,
      });
      const newAccessToken = res.data.access;
      localStorage.setItem("tokens", JSON.stringify(newAccessToken));
      return newAccessToken;
    } catch (err) {
      console.error("Failed to refresh access token:", err);
      return null;
    }
  };

  const getUsers = async () => {
    try {
      const res = await authAxios(`${API}/users`);
      dispatch({ type: "GET_USERS", payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegistration = async (newObj) => {
    try {
      const res = await axios.post(`${API}/auth/registration/`, newObj);
      return { success: true, message: res.data.detail || "Подтвердите email" };
    } catch (err) {
      if (err.response) {
        return { success: false, errors: err.response.data };
      }
      return {
        success: false,
        errors: { general: "Неизвестная ошибка при регистрации." },
      };
    }
  };

  const handleLogin = async (newObj, email) => {
    try {
      const res = await axios.post(`${API}/auth/login`, newObj);
      localStorage.setItem("tokens", JSON.stringify(res.data.access));
      localStorage.setItem("tokens_refresh", JSON.stringify(res.data.refresh));
      localStorage.setItem("email", email);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setCurrentUser(res.data.user);
      navigate("/");
    } catch (err) {
      alert("Incorrect email or password!");
      setError(err);
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      let accessToken = JSON.parse(localStorage.getItem("tokens"));
      const refreshToken = JSON.parse(localStorage.getItem("tokens_refresh"));

      if (!accessToken) {
        accessToken = await refreshAccessToken();
      }

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      await axios.post(`${API}/auth/logout`, { refresh: refreshToken }, config);
    } catch (err) {
      console.warn("Logout failed, clearing local data.");
    } finally {
      localStorage.removeItem("tokens");
      localStorage.removeItem("tokens_refresh");
      localStorage.removeItem("email");
      localStorage.removeItem("user");
      setCurrentUser(null);
      navigate("/");
    }
  };

  const editUserInfo = async (formData, id) => {
    try {
      const res = await axios.patch(`${API}/users/${id}`, formData);
      console.log("User updated:", res.data);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const getOneUser = async (id) => {
    try {
      const res = await authAxios(`${API}/users/${id}`);
      dispatch({ type: "GET_ONE_USER", payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const resetPassword = async (newObj) => {
    try {
      await axios.post(`${API}/auth/password/reset/`, newObj);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <authContext.Provider
      value={{
        currentUser,
        error,
        users: state.users,
        oneUser: state.oneUser,
        authLoading,
        handleRegistration,
        handleLogin,
        handleLogout,
        getUsers,
        getOneUser,
        editUserInfo,
        resetPassword,
        refreshAccessToken,
        setCurrentUser,
        setError,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
