import { Route, Routes } from "react-router";

import TextAreaEditor from "./components/CodeEditor/TextAreaEditor.js";
import { MainLayout } from "./components/MainLayout/MainLayout.js";
export const Router = () => (
  <>
    <Routes>
      <Route path="/" element={<MainLayout> </MainLayout>} />
      <Route path="/code" element={<TextAreaEditor> </TextAreaEditor>} /> f{" "}
    </Routes>{" "}
  </>
);
