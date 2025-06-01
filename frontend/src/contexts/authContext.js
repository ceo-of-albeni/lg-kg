import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

// const API = "https://lg.sytes.net";
const API = "http://127.0.0.1:8000";

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(false);

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  async function getUsers() {
    try {
      const res = await axios(`${API}/users`);
      dispatch({
        type: "GET_USERS",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }
  const API = "http://127.0.0.1:8000";
  // https://lg.sytes.net

  async function handleRegistration(newObj) {
    try {
      const res = await axios.post(`${API}/auth/registration/`, newObj);
      console.log("User created:", res.data);
      return { success: true };
    } catch (err) {
      if (err.response) {
        console.error("Error:", err);
        return { success: false, errors: err.response.data };
      } else {
        console.error("Unknown error:", err);
        return {
          success: false,
          errors: { general: "Unknown error occurred." },
        };
      }
    }
  }

  async function handleLogin(newObj, email) {
    try {
      const res = await axios.post(`${API}/auth/login`, newObj);
      localStorage.setItem("tokens", JSON.stringify(res.data.access));
      localStorage.setItem("tokens_refresh", JSON.stringify(res.data.refresh));
      localStorage.setItem("email", email);
      navigate("/");
      setCurrentUser(res.data.user);
      console.log();
    } catch (err) {
      alert("Incorrect email or password!");
      console.log(err);
      setError(err);
    }
  }

  async function handleLogout() {
    try {
      const accessToken = JSON.parse(localStorage.getItem("tokens"));
      const refreshToken = JSON.parse(localStorage.getItem("tokens_refresh"));
      const body = {
        refresh: refreshToken,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.post(`${API}/auth/logout`, body, config);
      localStorage.removeItem("tokens");
      localStorage.removeItem("tokens_refresh");
      localStorage.removeItem("email");

      setCurrentUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  async function editUserInfo(formData, id) {
    try {
      const res = await axios.patch(`${API}/users/${id}`, formData);
      console.log("User updated:", res.data);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  }

  async function getOneUser(id) {
    try {
      const res = await axios(`${API}/users/${id}`);
      dispatch({
        type: "GET_ONE_USER",
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <authContext.Provider
      value={{
        currentUser,
        error,
        users: state.users,
        oneUser: state.oneUser,

        handleRegistration,
        setError,
        handleLogin,
        getOneUser,
        getUsers,
        handleLogout,
        setCurrentUser,
        handleLogin,
        editUserInfo,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
