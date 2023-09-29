import React from "react";
import { Route, Routes } from "react-router";
import { MainLayout } from "../components/MainScreenComponents/MainScreenWithParticles";
import { TextEditor } from "../components/TextEditorСomponents/TextEditor";
import { MainComponent } from "../components/UserLoginComponents/MainComponent";

const Router: React.FC = () => (
  <>
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/code" element={<TextEditor />} />
      <Route path="/user/login" element={<MainComponent />} />
      <Route path="/user/reg" element={<MainComponent />} />
    </Routes>
  </>
);

export default Router;
