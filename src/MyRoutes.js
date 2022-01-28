import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import AddPage from "./pages/AddPage";
import Edit from "./pages/Edit";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import AdminProvider from "./contexts/AdminProvider";
import ClientProvider from "./contexts/ClientProvider";
import NotFountPage from "./pages/404";
import AuthProvider, { AuthContext } from "./contexts/AuthProvider";
import AuthProvide from "./components/context/AuthContext";
import Login from "./components/Login";
import Sigup from "./components/Sigup";
import PrivateRoute from "./components/PrivateRoute";
import Dashborad from "./components/Dashboard";
import { Container } from "@mui/material";

const MyRoutes = () => {
  return (
    <AuthProvide>
      <AuthProvider>
        <ClientProvider>
          <AdminProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/admin-panel" element={<AdminPage />} />
                <Route path="/admin-panel/add" element={<AddPage />} />
                <Route path="/admin-panel/edit/:id" element={<Edit />} />
                <Route path="/product-detail/:id" element={<DetailPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sigup" element={<Sigup />} />
                <Route
                  path="/"
                  element={<PrivateRoute element={Dashborad} />}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/*" element={<NotFountPage />} />
              </Routes>
            </BrowserRouter>
          </AdminProvider>
        </ClientProvider>
      </AuthProvider>
    </AuthProvide>
  );
};

export default MyRoutes;
