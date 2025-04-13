import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";
import styles from "./ProductDetailedPage.module.scss";
import OrderModal from "../../components/OrderModal/OrderModal";

const ProductDetailedPage = () => {
  const { getOneProduct, oneProduct } = useContext(productsContext);
  const { slug } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getOneProduct(slug);
  }, []);

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.title}>
        {oneProduct.name}
      </Typography>

      <Typography variant="subtitle1" className={styles.model}>
        {oneProduct?.slug?.toUpperCase()}
      </Typography>

      <Box className={styles.imageWrapper}>
        <img
          src={oneProduct.image}
          alt={oneProduct.name}
          className={styles.productImage}
        />
      </Box>

      <button onClick={() => setModalOpen(true)} className={styles.orderButton}>
        Заказать
      </button>

      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={oneProduct}
      />

      <Box className={styles.descriptionSection}>
        {oneProduct?.description?.map((item, index) => (
          <div className={styles.descriptionBlock} key={index}>
            <img
              src={item.image}
              alt={item.title}
              className={styles.descriptionImage}
            />
            <div>
              <h6 className={styles.descriptionTitle}>{item.title}</h6>
              <p className={styles.descriptionText}>{item.text}</p>
            </div>
          </div>
        ))}
      </Box>

      <Box mt={5}>
        <Typography variant="h5" className={styles.subtitle}>
          Технические характеристики
        </Typography>
        <Paper className={styles.tableWrapper}>
          <Table>
            <TableBody>
              {oneProduct?.specs?.map((spec, index) => (
                <TableRow key={index}>
                  <TableCell className={styles.label}>{spec.key}</TableCell>
                  <TableCell className={styles.value}>{spec.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProductDetailedPage;
