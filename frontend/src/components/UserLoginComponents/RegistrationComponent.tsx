import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import { IProps } from "../../interface/ILogin";

const RegistrationComponent: React.FC<IProps> = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    is_superuser: false,
    is_active: true,
    is_verified: false,
    role_id: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Update the url to your server endpoint
      const response = await axios.post(
        `http://127.0.0.1:8000/auth/register`,
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <IconButton onClick={toggleForm} color="primary">
            <ArrowForwardIcon
              style={{
                transform: "rotate(180deg)",
              }}
            />
          </IconButton>
          <div>
            <label htmlFor="name">Имя:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Имя пользователя:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Электронная почта:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </>
  );
};

export default RegistrationComponent;
