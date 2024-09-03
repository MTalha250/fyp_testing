import React from "react";
import { DownOutlined, UserOutlined, LockFilled } from "@ant-design/icons";
import { Layout, Dropdown, Space, theme } from "antd";
import useAuthStore from "../../stores";
import { Axios } from "../../config";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer } from "react-toastify";
const { Header } = Layout;

const HeaderDashboard = () => {
  const { authUser, removeAuthUser } = useAuthStore();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await Axios.post("api/auth/logout");
      removeAuthUser();
      toast.success("Logout Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      label: (
        <p className="pointer-events-none hover:none">
          {authUser?.isSeller ? "Seller Account" : "Buyer Account"}
        </p>
      ),
      key: "1",
      icon: <UserOutlined />,
      className: "hover:none",
    },
    {
      label: <div onClick={handleLogout}>Logout</div>,
      key: "2",
      icon: <LockFilled />,
      className: "logout-btn",
    },
  ];

  const menuProps = {
    items,
  };
  return (
    <>
     <ToastContainer
     position= "top-right"
     toastId= {1}
     autoClose= {1000}
    />
      <Header
        color="dark"
        style={{
          padding: "",
          background: "#E6E7E7",
        }}
      >
        <div className="flex flex-row justify-end items-center w-full">
          <Dropdown menu={menuProps}>
            <Space className="">
              <img
                src={authUser.img || Avatar}
                alt="user_image"
                className="w-[32px] h-[32px] mb-3 m-[10px] rounded-[50%] object-cover"
              />
              <span className="cursor-pointer font-bold">{authUser?.username}</span>
              <DownOutlined className="cursor-pointer" />
            </Space>
          </Dropdown>
        </div>
      </Header>
    </>
  );
};

export default HeaderDashboard;
