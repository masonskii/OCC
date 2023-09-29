import React, { useState } from "react";
import LoginComponent from "./LoginComponent";
import RegistrationComponent from "./RegistrationComponent";
import "../../static/css/login.css";

const MergeLoginComponents = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [isActive, setActive] = useState(true);

  const toggleForm = () => {
    setTimeout(() => {
      setShowLogin(!showLogin);
      setActive(!showLogin);
    }); // 1000мс = 1с, что соответствует длительности вашей анимации
  };

  return (
    <div className="container">
      {showLogin ? (
        <div className={`left-side ${isActive ? "active" : "inactive"}`}>
          <LoginComponent toggleForm={toggleForm} />
        </div>
      ) : (
        <div className={`right-side ${isActive ? "inactive" : "active"}`}>
          <RegistrationComponent toggleForm={toggleForm} />
        </div>
      )}
    </div>
  );
};

export default MergeLoginComponents;
