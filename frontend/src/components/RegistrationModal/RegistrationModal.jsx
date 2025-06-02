import React, { useContext, useState, useEffect } from "react";
import "./RegistrationModal.scss";
import { authContext } from "../../contexts/authContext";

const RegistrationModal = ({ closeModal }) => {
  const { handleRegistration } = useContext(authContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inn, setInn] = useState("");
  const [bic, setBic] = useState("");
  const [password1, setPassword] = useState("");
  const [password2, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password1: false,
    password2: false,
  });

  const validatePassword = (password1) => {
    const minLength = password1.length >= 8;
    const hasLetters = /[A-Za-z]/.test(password1);
    const hasNumbers = /\d/.test(password1);
    const commonPasswords = ["password", "12345678", "qwerty", "abc123"];

    if (!minLength) {
      return "Пароль должен содержать минимум 8 символов.";
    }
    if (!hasLetters || !hasNumbers) {
      return "Пароль должен содержать буквы и цифры.";
    }
    if (commonPasswords.includes(password1.toLowerCase())) {
      return "Пароль слишком простой, выберите другой.";
    }
    return "";
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      return "Неверный формат email.";
    }
    return "";
  };

  useEffect(() => {
    if (touchedFields.password1) {
      const pwdError = validatePassword(password1);
      setPasswordError(pwdError);
    } else {
      setPasswordError("");
    }

    if (touchedFields.email) {
      const emailErr = validateEmail(email);
      setEmailError(emailErr);
    } else {
      setEmailError("");
    }

    if (touchedFields.password2) {
      if (password1 !== password2) {
        setPasswordConfirmError("Пароли не совпадают.");
      } else {
        setPasswordConfirmError("");
      }
    } else {
      setPasswordConfirmError("");
    }

    const allFieldsFilled =
      name.trim() &&
      surname.trim() &&
      email.trim() &&
      phone.trim() &&
      inn.trim() &&
      bic.trim() &&
      password1.trim() &&
      password2.trim();

    const noErrors =
      !validatePassword(password1) &&
      !validateEmail(email) &&
      password1 === password2 &&
      allFieldsFilled;

    setIsFormValid(!!noErrors);
  }, [
    name,
    surname,
    email,
    phone,
    inn,
    bic,
    password1,
    password2,
    touchedFields,
  ]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setTouchedFields((prev) => ({ ...prev, password1: true }));
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setTouchedFields((prev) => ({ ...prev, email: true }));
  };

  const handlePasswordConfirmChange = (e) => {
    const newPasswordConfirm = e.target.value;
    setPasswordConfirm(newPasswordConfirm);
    setTouchedFields((prev) => ({ ...prev, password2: true }));
  };

  const createUser = async (e) => {
    e.preventDefault();
    setIsLoading(true); // <-- Start loading

    const pwdError = validatePassword(password1);
    const emailErr = validateEmail(email);

    if (pwdError || emailErr || password1 !== password2) {
      setPasswordError(pwdError);
      setEmailError(emailErr);
      if (password1 !== password2) {
        setPasswordConfirmError("Пароли не совпадают.");
      }
      setIsLoading(false); // <-- Stop loading on error
      return;
    }

    const newObj = {
      email,
      password1,
      password2,
      name,
      surname,
      phone,
      inn,
      bic,
    };

    const result = await handleRegistration(newObj);
    setIsLoading(false);

    if (result.success) {
      setSuccessMessage(
        "✅ Подтвердите ваш email перед входом. Письмо может попасть в папку Спам."
      );
      setTimeout(() => {
        closeModal(); // close after short delay
      }, 10000);
    } else {
      const errors = result.errors;

      if (errors.password1) {
        setPasswordError(errors.password1.join(" "));
      }

      if (errors.email) {
        const emailMsg = errors.email.join(" ");
        const translatedEmailError = emailMsg.includes("already registered")
          ? "Пользователь с таким email уже зарегистрирован."
          : emailMsg;
        setEmailError(translatedEmailError);
      }

      if (errors.general) {
        alert(errors.general);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>
          ✕
        </span>
        <h2>Регистрация</h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

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
              onChange={handleEmailChange}
              required
              className={emailError ? "error-input" : ""}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>

          <div className="form-group">
            <label>Телефон:</label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+996 ___ ___ ___"
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
              value={password1}
              onChange={handlePasswordChange}
              required
              className={passwordError ? "error-input" : ""}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          <div className="form-group">
            <label>Подтвердите пароль:</label>
            <input
              type="password"
              name="password-confirm"
              value={password2}
              onChange={handlePasswordConfirmChange}
              required
              className={passwordConfirmError ? "error-input" : ""}
            />
            {passwordConfirmError && (
              <p className="error-message">{passwordConfirmError}</p>
            )}
          </div>
          {isLoading && (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          )}

          <button
            type="submit"
            onClick={createUser}
            disabled={!isFormValid}
            className={!isFormValid ? "disabled-button" : ""}>
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
