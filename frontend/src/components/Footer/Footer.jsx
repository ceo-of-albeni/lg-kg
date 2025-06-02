import * as React from "react";
import "./Footer.scss";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Footer = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <footer>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Контакты</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Адрес: Тоголок Молдо, 40
            <br />
            Номер: +996 990 099 010
            <br />
            {/* Почта: polytechnology@gmail.com */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>

      <p>© 2024 Poly Technology</p>
      <div className="footer_icon">
        <LocalPhoneIcon onClick={handleClickOpen} />
      </div>
    </footer>
  );
};

export default Footer;
