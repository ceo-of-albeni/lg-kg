import React, { useState } from "react";
import "./ContactsPage.scss";
import axios from "axios";

const API = "http://localhost:8000"; // your JSON server base URL

const ContactsPage = () => {
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

    try {
      // Get existing messages
      const res = await axios.get(`${API}/contacts_message`);
      const messages = res.data;

      // Calculate next ID
      const nextId =
        messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1;

      const newMessage = { ...formData, id: nextId };

      // Post new message with custom ID
      await axios.post(`${API}/contacts_message`, newMessage);

      alert("Ваше сообщение успешно отправлено!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      alert("Произошла ошибка. Попробуйте еще раз.");
    }
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
