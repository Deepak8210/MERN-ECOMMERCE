import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apiSummary from "./common";
function App() {
  const getUserProfile = async () => {
    const userProfile = await axios.get(apiSummary.profile.url);
    console.log(userProfile);
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <ToastContainer autoClose={2000} />
      </main>
      <Footer />
    </>
  );
}

export default App;
