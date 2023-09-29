import React, {StrictMode } from "react";
import { Layout } from "./LayoutOnParticles";
import "../../static/css/MainLayout.css";
import TSPR from "../BackgroundParticles";

export const MainLayout = () => (
  <>
    <Layout />
    <StrictMode>
      <TSPR />
    </StrictMode>{" "}
  </>
);
