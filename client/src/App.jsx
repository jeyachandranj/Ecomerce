import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./Pages/ProductPage";
import AddToCard from "./Pages/AddToCard";
import CheckOut from "./Pages/CheckOut";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

import PaymentPage from "./Pages/paymentPage";

import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashbaord from "./Pages/Admin/AdminDashboard";
import AddProduct from "./Pages/Admin/AddProduct";
import Orders from "./Pages/Admin/Orders";
import '@fontsource/poppins';
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signuppage" element={<SignupPage />} />
        <Route path="/bookdetails" element={<ProductPage />} />
        <Route path="/addtocart" element={<AddToCard />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/pay" element={<PaymentPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashbaord />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default App;
