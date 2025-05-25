import React, { useContext, useState } from "react";
import "./RegistrationModal.scss";
import { authContext } from "../../contexts/authContext";

const RegistrationModal = ({ closeModal }) => {
  const { handleRegister } = useContext(authContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inn, setInn] = useState("");
  const [bic, setBic] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !surname.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !inn.trim() ||
      !bic.trim() ||
      !password.trim() ||
      !passwordConfirm.trim()
    ) {
      alert("Some inputs are empty!");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Passwords are not the same!");
      return;
    }

    let newObj = {
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      inn: inn,
      bic: bic,
      password: password,
    };

    console.log(newObj);

    handleRegister(newObj);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>
          ✕
        </span>
        <h2>Регистрация</h2>
        <form>
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Фамилия:</label>
            <input
              type="text"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Телефон:</label>
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>ИНН (Taxpayer Identification Number):</label>
            <input
              type="text"
              name="inn"
              value={inn}
              onChange={(e) => setInn(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>БИК (Bank Identifier Code):</label>
            <input
              type="text"
              name="bic"
              value={bic}
              onChange={(e) => setBic(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Подтвердите пароль:</label>
            <input
              type="password"
              name="password-confirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          <button type="submit" onClick={createUser}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
