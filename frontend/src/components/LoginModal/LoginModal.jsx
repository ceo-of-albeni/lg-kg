import React, { useState, useContext } from "react";
import "./LoginModal.scss";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import { authContext } from "../../contexts/authContext";

const LoginModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const { handleLogin } = useContext(authContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    console.log(formData);

    handleLogin(formData, email);
    closeModal();
  };

  return isRegistering ? (
    <RegistrationModal
      closeModal={() => {
        setIsRegistering(false);
        closeModal();
      }}
    />
  ) : (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>
          ✕
        </span>
        <h2>Вход в систему</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Войти</button>
          <p className="signup-text">
            Нет аккаунта?{" "}
            <span onClick={() => setIsRegistering(true)}>
              Зарегистрироваться
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
