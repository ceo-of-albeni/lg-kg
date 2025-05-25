import React, { useState } from "react";
import "./ChangePasswordModal.scss";

const ChangePasswordModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: hook this into your actual password reset logic
    console.log("Password reset requested for:", email);
    alert(`Инструкция по сбросу пароля отправлена на ${email}`);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>
          ✕
        </span>
        <h2>Сброс пароля</h2>
        <p className="instruction">
          Введите свой email, и мы отправим вам подтверждение на сброс пароля.
        </p>
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
            <label>Новый пароль:</label>
            <input
              type="password"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
