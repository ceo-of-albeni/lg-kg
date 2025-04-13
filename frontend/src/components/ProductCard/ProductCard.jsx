import React from "react";
import styles from "./ProductCard.module.scss";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onOrderClick }) => {
  const navigate = useNavigate();

  const defaultSpecLabels = [
    "Производительность (кВт)",
    "EER",
    "Габаритные размеры(мм)",
    "Хладагент",
    "Электропитание (В , Ø , Гц)",
  ];

  const matchedSpecs =
    product.specs
      ?.filter((spec) => defaultSpecLabels.includes(spec.key.trim()))
      .map((spec) => `${spec.key}: ${spec.value}`) || [];

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        className={styles.image}
      />
      <CardContent className={styles.content}>
        <Typography variant="subtitle1" className={styles.title}>
          {product.name}
        </Typography>

        {/* {product.product_model && (
          <Typography variant="caption" className={styles.model}>
            {product.product_model}
          </Typography>
        )} */}

        <ul className={styles.specs}>
          {matchedSpecs.length > 0 ? (
            matchedSpecs.map((spec, index) => <li key={index}>{spec}</li>)
          ) : (
            <li>Характеристики не найдены</li>
          )}
        </ul>

        <div className={styles.buttons}>
          <Button
            variant="contained"
            onClick={() => navigate(`/products/${product.slug}`)}
            sx={{
              backgroundColor: "#a80036",
              "&:hover": { backgroundColor: "#8e002e" },
            }}>
            Подробнее
          </Button>

          <Button
            variant="outlined"
            onClick={onOrderClick}
            sx={{
              borderColor: "#a80036",
              color: "#a80036",
              "&:hover": {
                backgroundColor: "#f7f0f2",
                borderColor: "#8e002e",
                color: "#8e002e",
              },
            }}>
            Заказать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
