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

const API = "http://localhost:8000";

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(false);

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const navigate = useNavigate();

  // Later in useEffect or after login, you can check:
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

  async function handleRegister(newObj) {
    try {
      const res = await axios.post(`${API}/auth/register`, newObj);
      // navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
    }
  }

  async function handleLogin(formData, email) {
    try {
      const res = await axios.get(`${API}/users`);
      const users = res.data;
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("email", email);
        console.log("Вы вошли в аккаунт.");

        navigate("/");
      } else {
        alert("Вы ввели неправильную почту или пароль!");
      }
    } catch (err) {
      console.log(err);
      setError(err);
      alert("Произошла ошибка при входе.");
    }
  }

  async function handleUser(newProduct, navigate) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.post(`${API}/user-profile/`, newProduct, config);
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
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
      const res = await axios.get(`${API}/users?id=${id}`);
      dispatch({
        type: "GET_ONE_USER",
        payload: res.data[0],
      });
      console.log(res.data, "eee");
    } catch (err) {
      console.error("Error fetching user profile:", err);
      if (err.response) {
        if (err.response.status === 401) {
          console.warn("Unauthorized: Redirecting to login...");
        }
      }
    }
  }

  return (
    <authContext.Provider
      value={{
        currentUser,
        error,
        users: state.users,
        oneUser: state.oneUser,

        handleRegister,
        setError,
        handleLogin,
        getOneUser,
        getUsers,
        handleLogout,
        handleUser,
        setCurrentUser,
        handleLogin,
        editUserInfo,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
