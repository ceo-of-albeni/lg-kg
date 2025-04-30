import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductsPage.module.scss";
import { Pagination, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard/ProductCard";
import { productsContext } from "../../contexts/productsContext";
import { useSearchParams } from "react-router-dom";
import OrderModal from "../../components/OrderModal/OrderModal";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const { getProducts, products } = useContext(productsContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCategory]);

  const itemsOnPage = 12;

  const handlePage = (e, p) => setPage(p);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  let filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const count = filteredProducts
    ? Math.ceil(filteredProducts.length / itemsOnPage)
    : 0;

  const currentData = () => {
    const begin = (page - 1) * itemsOnPage;
    const end = begin + itemsOnPage;
    return filteredProducts.slice(begin, end);
  };
  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.pageTitle}>
        Вся линейка продукции
      </Typography>

      {!filteredProducts || filteredProducts.length === 0 ? (
        <Typography align="center">Загрузка...</Typography>
      ) : (
        <div className={styles.grid}>
          {currentData().map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              onOrderClick={() => handleOrderClick(product)}
            />
          ))}
        </div>
      )}

      <div className={styles.paginationWrapper}>
        <Pagination count={count} page={page} onChange={handlePage} />
      </div>

      <OrderModal
        open={modalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
}
