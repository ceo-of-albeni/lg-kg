import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./OrderModal.module.scss";
import { productsContext } from "../../contexts/productsContext";

const OrderModal = ({ open, onClose, product }) => {
  const { postOrder } = useContext(productsContext);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
    clicked_product_name: "",
    project_name: "",
    project_address: "",
    estimated_realization_date: "",
    bulding_type: "",
    building_floors: "",
    cac_system_type: "",
    cac_idu_type: "",
    capacity_per_m2: "",
    piping_type: "",
    odu_placing: "",
    accessories: "",
    remarks: "",
  });

  const [showMore, setShowMore] = useState(false);
  const [agree, setAgree] = useState(true);

  useEffect(() => {
    if (product?.slug) {
      setForm((prev) => ({
        ...prev,
        clicked_product_name: product.slug,
      }));
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modal}>
        <IconButton
          onClick={onClose}
          className={styles.closeButton}
          size="small">
          <CloseIcon />
        </IconButton>

        <Typography variant="h6">
          Заполните короткую форму и наш менеджер свяжется с вами для оформления
          заказа
        </Typography>

        <TextField
          name="phone"
          label="Телефон *"
          required
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="name"
          label="Имя *"
          required
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="comment"
          label="Ваш запрос"
          fullWidth
          multiline
          rows={3}
          onChange={handleChange}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              sx={{
                color: "#a50034",
                "&.Mui-checked": { color: "#a50034" },
              }}
            />
          }
          label={
            <span>
              Я согласен с политикой защиты персональных данных.{" "}
              <a href="#" style={{ color: "#a50034" }}>
                Ознакомиться
              </a>
            </span>
          }
        />

        <Button
          onClick={() => setShowMore(!showMore)}
          variant="contained"
          className={styles.showMoreBtn}>
          {showMore
            ? "Скрыть дополнительную информацию"
            : "Добавить дополнительную информацию >>>"}
        </Button>

        {showMore && (
          <Box className={styles.extraInputs}>
            {[
              ["project_name", "Название проекта"],
              ["project_address", "Адрес проекта"],
              ["estimated_realization_date", "Предполагаемая дата реализации"],
              ["bulding_type", "Тип здания"],
              ["building_floors", "Этажность здания"],
              ["cac_system_type", "Тип CAC-системы"],
              ["cac_idu_type", "Тип внутреннего блока CAC"],
              ["capacity_per_m2", "Мощность на м²"],
              ["piping_type", "Тип трубопровода"],
              ["odu_placing", "Размещение наружного блока"],
              ["accessories", "Аксессуары"],
              ["remarks", "Доп. замечания"],
            ].map(([name, label]) => (
              <TextField
                key={name}
                name={name}
                label={label}
                fullWidth
                onChange={handleChange}
              />
            ))}
          </Box>
        )}

        <Button
          variant="contained"
          onClick={handleSubmit}
          className={styles.submitButton}>
          Отправить
        </Button>
      </Box>
    </Modal>
  );
};

export default OrderModal;
