import React from 'react';
import { Route, Routes } from "react-router";
import { MainLayout } from '../components/MainScreenComponents/MainScreenWithParticles';
import { TextEditor } from '../components/TextEditorСomponents/TextEditor';

const Router: React.FC = () => (
  <>
    <Routes>
      <Route path="/" element={<MainLayout/>} />
      <Route path="/code" element={<TextEditor/>} />
    </Routes>
  </>
);

export default Router;