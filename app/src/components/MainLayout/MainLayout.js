import React, { Component, useState, useEffect, StrictMode } from "react";
import { Layout } from "./Layout.js";
import "../../static/MainLayout.css";
import TSRP from "./tspr.js";
export const MainLayout = () => (
  <>
    <Layout />
    <StrictMode>
      <TSRP />
    </StrictMode>{" "}
  </>
);
