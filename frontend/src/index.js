import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage.js";
import EnquetePage from "./pages/EnquetePage.js";
import CriarEnquete from "./pages/CriarEnquete.js";

import "./index.js";

function Navigation() {
  return (
    <main>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/criar-enquete" element={<CriarEnquete/>} />
        <Route exact path="/enquete/:id" element={<EnquetePage/>} />
      </Routes>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Navigation />
    </Router>
  </React.StrictMode>
);
