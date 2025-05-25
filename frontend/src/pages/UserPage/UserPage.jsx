import React, { useContext, useEffect, useState } from "react";
import "./UserPage.scss";
import { authContext } from "../../contexts/authContext";
import axios from "axios";
import { Button } from "@mui/material";
import { Modal, Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"; // ✅ import useNavigate

const API = "http://127.0.0.1:8000";

const UserPage = () => {
  const {
    editUserInfo,
    getOneUser,
    oneUser = {},
    currentUser, // ✅ get currentUser
  } = useContext(authContext);

  const [userOrders, setUserOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ for redirect

  // 🔒 Redirect if NOT logged in
  useEffect(() => {
    if (!currentUser && !localStorage.getItem("tokens")) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    getOneUser(id);
  }, [id]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [name, setName] = useState(oneUser.name);
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inn, setInn] = useState("");
  const [bic, setBic] = useState("");

  useEffect(() => {
    if (oneUser) {
      setName(oneUser.name || "");
      setSurname(oneUser.surname || "");
      setPhone(oneUser.phone || "");
      setEmail(oneUser.email || "");
      setInn(oneUser.inn || "");
      setBic(oneUser.bic || "");
    }
  }, [oneUser]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API}/orders`);
        const userEmail = localStorage.getItem("email")?.trim().toLowerCase();
        const filtered = res.data.filter(
          (order) => order.email?.trim().toLowerCase() === userEmail
        );
        setUserOrders(filtered);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [oneUser]);

  async function saveChanges() {
    if (
      !name.trim() ||
      !surname.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !inn.trim() ||
      !bic.trim()
    ) {
      alert("Некоторые поля пустые!");
      return;
    }

    const editedInfo = {
      name,
      surname,
      phone,
      email,
      inn,
      bic,
    };

    try {
      await editUserInfo(editedInfo, oneUser.id);
      alert("Профиль успешно обновлён!");
      setIsEditing(false);
      getOneUser(oneUser.id);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  }

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="user-page">
      <h1>Профиль пользователя</h1>

      <div className="user-info">
        {isEditing ? (
          <>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <input
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="inn"
              value={inn}
              onChange={(e) => setInn(e.target.value)}
            />
            <input
              name="bic"
              value={bic}
              onChange={(e) => setBic(e.target.value)}
            />
            <button
              className="see_btn"
              style={{ marginRight: "20px" }}
              onClick={saveChanges}>
              Сохранить
            </button>
            <button className="see_btn" onClick={() => setIsEditing(false)}>
              Отмена
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Имя:</strong> {oneUser.name}
            </p>
            <p>
              <strong>Фамилия:</strong> {oneUser.surname}
            </p>
            <p>
              <strong>Телефон:</strong> {oneUser.phone}
            </p>
            <p>
              <strong>Email:</strong> {oneUser.email}
            </p>
            <p>
              <strong>ИНН:</strong> {oneUser.inn}
            </p>
            <p>
              <strong>БИК:</strong> {oneUser.bic}
            </p>

            <Button
              variant="contained"
              onClick={() => setIsEditing(true)}
              className="submitButton">
              Редактировать
            </Button>
          </>
        )}
      </div>

      <h2>История заказов</h2>
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Название продукта</th>
              <th>Комментарий</th>
              <th>Дополнительная информация</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order, index) => (
              <tr key={`${order.id}-${index}`}>
                <td>{order.clicked_product_name}</td>
                <td>{order.comment}</td>
                <td>
                  <Button
                    variant="outlined"
                    className="see_btn"
                    size="small"
                    onClick={() => handleOpenModal(order)}>
                    Посмотреть
                  </Button>
                </td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 600,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxHeight: "90vh",
              overflowY: "auto",
            }}>
            <Typography variant="h6" gutterBottom>
              Дополнительная информация
            </Typography>
            {selectedOrder && (
              <Box>
                <p>
                  <strong>Проект:</strong> {selectedOrder.project_name}
                </p>
                <p>
                  <strong>Адрес:</strong> {selectedOrder.project_address}
                </p>
                <p>
                  <strong>Дата реализации:</strong>{" "}
                  {selectedOrder.estimated_realization_date}
                </p>
                <p>
                  <strong>Тип здания:</strong> {selectedOrder.bulding_type}
                </p>
                <p>
                  <strong>Этажность:</strong> {selectedOrder.building_floors}
                </p>
                <p>
                  <strong>Тип системы:</strong> {selectedOrder.cac_system_type}
                </p>
                <p>
                  <strong>Тип IDU:</strong> {selectedOrder.cac_idu_type}
                </p>
                <p>
                  <strong>Мощность на м²:</strong>{" "}
                  {selectedOrder.capacity_per_m2}
                </p>
                <p>
                  <strong>Тип труб:</strong> {selectedOrder.piping_type}
                </p>
                <p>
                  <strong>Расположение ODU:</strong> {selectedOrder.odu_placing}
                </p>
                <p>
                  <strong>Аксессуары:</strong> {selectedOrder.accessories}
                </p>
                <p>
                  <strong>Примечания:</strong> {selectedOrder.remarks}
                </p>
                <p>
                  <strong>Ссылка на хранилище с файлами DWG/PDF:</strong>{" "}
                  <a href={selectedOrder.file_link}>
                    {selectedOrder.file_link}
                  </a>
                </p>
              </Box>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default UserPage;
