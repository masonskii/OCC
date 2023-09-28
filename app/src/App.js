import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router.js";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Router />
      </BrowserRouter>{" "}
    </React.StrictMode>
  );
}
export default App;
