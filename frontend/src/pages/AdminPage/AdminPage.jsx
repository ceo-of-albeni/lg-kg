import React, { useContext, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import "./AdminPage.scss";
import { productsContext } from "../../contexts/productsContext";

const AdminPage = () => {
  const { addCase, addNews } = useContext(productsContext);

  const [tabIndex, setTabIndex] = useState(0);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    type: "",
    model: "",
    image: "",
    slug: "",
  });

  const [caseForm, setCaseForm] = useState({
    title: "",
    description: "",
    image: "",
    address: "",
    date: "",
    company: "",
    body: "",
  });

  const [newsForm, setNewsForm] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    body: "",
  });

  const handleProductSubmit = (e) => {
    e.preventDefault();
    // addProduct(productForm);
  };

  const handleCaseSubmit = (e) => {
    e.preventDefault();
    addCase(caseForm);
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    addNews(newsForm);
  };

  return (
    <Container className="admin-page" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
        <Typography variant="h4">Панель Администратора</Typography>

        <Tabs
          value={tabIndex}
          onChange={(e, newIndex) => setTabIndex(newIndex)}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#b30021" } }}>
          <Tab label="Добавить продукт" />
          <Tab label="Добавить кейс" />
          <Tab label="Добавить новость" />
        </Tabs>

        {/* --- Product Form --- */}
        {tabIndex === 0 && (
          <Box component="form" onSubmit={handleProductSubmit} mt={3}>
            {["name", "category", "type", "model", "image", "slug"].map(
              (field) => (
                <TextField
                  key={field}
                  label={field}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={productForm[field]}
                  onChange={(e) =>
                    setProductForm({ ...productForm, [field]: e.target.value })
                  }
                />
              )
            )}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 2, backgroundColor: " #b30021" }}>
              Сохранить продукт
            </Button>
          </Box>
        )}

        {/* --- Case Form --- */}
        {tabIndex === 1 && (
          <Box component="form" onSubmit={handleCaseSubmit} mt={3}>
            {[
              "title",
              "description",
              "image",
              "address",
              "date",
              "company",
              "body",
            ].map((field) => (
              <TextField
                key={field}
                label={field}
                variant="outlined"
                fullWidth
                margin="normal"
                multiline={field === "body"}
                rows={field === "body" ? 6 : 1}
                value={caseForm[field]}
                onChange={(e) =>
                  setCaseForm({ ...caseForm, [field]: e.target.value })
                }
              />
            ))}
            <Button
              variant="contained"
              color="error"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}>
              Сохранить кейс
            </Button>
          </Box>
        )}

        {/* --- News Form --- */}
        {tabIndex === 2 && (
          <Box component="form" onSubmit={handleNewsSubmit} mt={3}>
            {["title", "description", "image", "date", "body"].map((field) => (
              <TextField
                key={field}
                label={field}
                variant="outlined"
                fullWidth
                margin="normal"
                multiline={field === "body"}
                rows={field === "body" ? 6 : 1}
                value={newsForm[field]}
                onChange={(e) =>
                  setNewsForm({ ...newsForm, [field]: e.target.value })
                }
              />
            ))}
            <Button
              variant="contained"
              color="error"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}>
              Сохранить новость
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AdminPage;
