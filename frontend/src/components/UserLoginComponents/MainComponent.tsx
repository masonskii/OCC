import React, {StrictMode } from "react";
import MergeLoginComponents from "./MergeLoginComponents";
import "../../static/css/MainLayout.css";
import TSPR from "../BackgroundParticles";

export const MainComponent = () => (
  <>
    <MergeLoginComponents />
    <StrictMode>
      <TSPR />
    </StrictMode>{" "}
  </>
);