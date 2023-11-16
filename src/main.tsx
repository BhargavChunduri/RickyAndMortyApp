import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import MoreInfo from "./components/MoreInfo/MoreInfo.tsx";
import Header from "./components/header/Header.tsx";
import Banner from "./components/Banner/Banner.tsx";
// import Footer from "./components/footer/Footer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <BrowserRouter>
    <Header/>
    <Banner/>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/detailed-view/:charId" element={<MoreInfo />}></Route>
      </Routes>
    </BrowserRouter>
    {/* <Footer/> */}
  </React.StrictMode>
);
