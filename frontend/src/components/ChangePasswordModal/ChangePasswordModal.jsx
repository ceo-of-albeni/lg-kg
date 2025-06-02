import React, { useContext, useState } from "react";
import "./ChangePasswordModal.scss";
import { authContext } from "../../contexts/authContext";

const ChangePasswordModal = ({ closeModal }) => {
  const { resetPassword } = useContext(authContext);
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let newObj = {
      email,
    };
    resetPassword(newObj);
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
          {/* <div className="form-group">
            <label>Новый пароль:</label>
            <input
              type="password"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div> */}
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
