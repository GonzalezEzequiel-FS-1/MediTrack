import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import SignIn from "./pages/SignIn.jsx";
import Signup from "./pages/Signup.jsx";
import Landing from "./pages/Landing.jsx";
import NavBar from "./Components/NavBar.jsx";
import styled from "styled-components";
const AppContainer = styled.div`
  background-color: #272727;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContainer>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </AppContainer>
  </StrictMode>
);
