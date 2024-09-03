import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";
import Orders from "./pages/orders/Orders";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import MyGigs from "./pages/myGigs/MyGigs";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Success from "./pages/success/Success";
import Pay from "./pages/pay/Pay";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/SideBar/Sidebar";
import { Layout } from "antd";
import EditService from "./pages/add/EditService";

const App = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isDashboardPath = [
    "/dashboard",
    "/gigs",
    "/orders",
    "/myGigs",
    "/add",
    "/messages",
    "/success",
    "/gigs/:id",
    "/messages/:id",
    "/pay/:id",
    "/edit-service"
  ].some(path => pathname.startsWith(path));

  return (
    <div>
      {isDashboardPath ? (
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/gigs" element={<Gigs />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/myGigs" element={<MyGigs />} />
              <Route path="/add" element={<Add />} />
              <Route path="/edit-service" element={<EditService />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/success" element={<Success />} />
              <Route path="/gigs/:id" element={<Gig />} />
              <Route path="/messages/:id" element={<Message />} />
              <Route path="/pay/:id" element={<Pay/>} />
            </Routes>
          </Layout>
        </Layout>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/join" element={<Register />} />
            <Route path="/pay/:id" element={<Pay/>} />

          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
