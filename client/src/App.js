import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
    return (
       <BrowserRouter>
           <Navigation />
           <Routes>
               <Route exact path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
           </Routes>
       </BrowserRouter>
    );
}

export default App;
