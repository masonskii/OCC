import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

// TODO: Перенести стили в css
const ButtonContainer = styled.div`
  z-index: 2;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const MainButtons = styled.div`
  margin-bottom: 1rem;
`;

export const Layout = () => {
  // TODO: После переноса стилей в ксс сделать через один цикл
  const user_links = [
    {
      id: 1,
      name: "Вход",
      link: "/user/login",
    },
    {
      id: 2,
      name: "Регистрация",
      link: "/user/reg",
    },
  ];
  const links = [
    {
      id: 1,
      name: "Text Editor",
      link: "/code",
    },
  ];
  return (
    <>
      <div className="nav">
        <h1> Online Text Editor </h1>{" "}
        <h3 className="span loader">
          <span className="m"> JAVASCRIPT, </span>{" "}
          <span className="m"> PYTHON, </span>{" "}
          <span className="m"> C / C++/ C#,</span>
          <span className="m"> GOLANG, </span>{" "}
          <span className="m"> and more </span>{" "}
        </h3>{" "}
        <ButtonContainer>
          {" "}
          <MainButtons>
            {" "}
            {user_links.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    minWidth: "200px",
                    maxWidth: "500px",
                  }}
                >
                  {item.name}{" "}
                </Button>{" "}
              </Link>
            ))}{" "}
          </MainButtons>{" "}
          {links.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="secondary"
                style={{
                  minWidth: "400px",
                  maxWidth: "1000px",
                }}
              >
                {item.name}{" "}
              </Button>{" "}
            </Link>
          ))}{" "}
        </ButtonContainer>{" "}
      </div>{" "}
    </>
  );
};
