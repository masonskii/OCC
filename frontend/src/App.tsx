import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routers/mainRouter";


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