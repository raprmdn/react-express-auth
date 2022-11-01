import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Navigation from "./components/Navigation";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import RequireAuth from "./components/RequireAuth";

function App() {
    return (
       <>
           <BrowserRouter>
               <Navigation />
               <Routes>
                   <Route path="/" element={<Layout />}>
                       {/* Public Route */}
                       <Route index element={<Home />} />
                       <Route path="/login" element={<Login />} />
                       <Route path="/register" element={<Register />} />

                       {/* Protected Route */}
                      <Route element={<RequireAuth />}>
                          <Route path="/dashboard" element={<Dashboard />} />
                      </Route>
                   </Route>
               </Routes>
           </BrowserRouter>
           <Toaster />
       </>
    );
}

export default App;
