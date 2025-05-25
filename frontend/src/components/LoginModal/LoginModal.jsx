import React, { useState, useContext } from "react";
import "./LoginModal.scss";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import { authContext } from "../../contexts/authContext";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";

const LoginModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const { handleLogin } = useContext(authContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

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
  ) : isResettingPassword ? (
    <ChangePasswordModal closeModal={() => setIsResettingPassword(false)} />
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

          <p
            className="forgot-password"
            onClick={() => setIsResettingPassword(true)}>
            Забыли пароль?
          </p>

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
