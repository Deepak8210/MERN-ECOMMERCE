import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apiSummary from "./common";
import context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const getUserProfile = async () => {
    const userProfile = await axios.get(apiSummary.profile.url);
    dispatch(setUserDetails(userProfile.data));
  };

  return (
    <>
      <context.Provider value={{ getUserProfile }}>
        context
        <Header />
        <main>
          <Outlet />
          <ToastContainer autoClose={2000} />
        </main>
        <Footer />
      </context.Provider>
    </>
  );
}

export default App;
