import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import CoinPage from "./pages/Coin";
import ComparePage from "./pages/ComparePage";
import WatchlistPage from "./pages/watchlist";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Common/Footer";
import Header from "./components/Common/Header";



function App() {
  return (
    <div className="App">
        <ToastContainer />
     <BrowserRouter>
     <Header/>
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/coin/:id" element={<CoinPage/>}/>
      <Route path="/compare" element={<ComparePage/>}/>
      <Route path="/Watchlist" element={<WatchlistPage/>}/>
     </Routes>
     <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
