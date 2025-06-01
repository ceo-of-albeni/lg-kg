import React, { useContext, useState } from "react";
import "./ContactsPage.scss";
import axios from "axios";
import { productsContext } from "../../contexts/productsContext";

const ContactsPage = () => {
  const { postRequestFromContacts } = useContext(productsContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    postRequestFromContacts(formData);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contacts-page">
      <div className="contacts-info">
        <h2>Контакты</h2>
        <p>Если у вас есть вопросы, не стесняйтесь обращаться!</p>
        <div className="contact-details">
          <p>
            <strong>Email:</strong> contact@company.com
          </p>
          <p>
            <strong>Телефон:</strong> +123 456 7890
          </p>
          <p>
            <strong>Адрес:</strong> ул. Примерная, 1, Бишкек, Кыргызстан
          </p>
        </div>
      </div>

      <div className="contact-form">
        <h3>Оставьте сообщение</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Сообщение:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required></textarea>
          </div>

          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default ContactsPage;
