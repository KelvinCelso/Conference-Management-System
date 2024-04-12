import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import {
  StyledThemeProviderWrapper,
  ThemeProvider,
} from "./context/ThemeContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RecoilRoot>
        <StyledThemeProviderWrapper>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StyledThemeProviderWrapper>
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);
