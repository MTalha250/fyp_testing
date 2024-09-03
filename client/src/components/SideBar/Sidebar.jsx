import React, { useState } from 'react'
import {  Menu, Layout } from "antd";
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores';
import {
    HomeOutlined,
    ShoppingCartOutlined,
    MessageOutlined,
    PlusSquareOutlined,
    BarChartOutlined
  } from '@ant-design/icons';
const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { authUser } = useAuthStore();
  
    const itemsSeller = [
        {
            key: "logo",
            label: (
                <p
                className="cursor-pointer w-full text-[34px] text-[#FFFFFF] font-bold"
              >
                {`${!collapsed ? "ServiceLance" : "S"}  `}
              </p>
            ),
            className:"logoDash"
          },
        {
            key: "1",
            label: (
                <NavLink
                to="/"
                className="cursor-pointer w-full text-sm text-darkColor"
              >
                Home
              </NavLink>
               
            ),
            icon:<HomeOutlined />

          },
          {
            key: "2",
            label: (
                <NavLink
                to="/dashboard"
                className="cursor-pointer w-full text-sm text-darkColor"
              >
                Dashboard
              </NavLink>
               
            ),
            icon:<BarChartOutlined />,
           
          },
        {
          key: "3",
          label: (
            <div >
              
                <>
                  <NavLink
                    to="/myGigs"
                    className="cursor-pointer w-full text-sm text-darkColor"
                  >
                    My Services
                  </NavLink>
                </>
            </div>
          ),
       icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gem" viewBox="0 0 16 16">
       <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6zm11.386 3.785-1.806-2.41-.776 2.413zm-3.633.004.961-2.989H4.186l.963 2.995zM5.47 5.495 8 13.366l2.532-7.876zm-1.371-.999-.78-2.422-1.818 2.425zM1.499 5.5l5.113 6.817-2.192-6.82zm7.889 6.817 5.123-6.83-2.928.002z"/>
     </svg>
        },
        {
            key: "4",
            label: (
              <div >
                  <>
                    <NavLink
                      to="/add"
                    >
                      Add New Services
                    </NavLink>
                    
                  </>               
              </div>
            ),
            icon:<PlusSquareOutlined />
          },
          {
            key: "5",
            label: (
                <NavLink
                to="/orders"
                className="cursor-pointer w-full text-sm text-darkColor"
              >
                Orders
              </NavLink>
               
            ),
            icon:<ShoppingCartOutlined />

          },
          {
            key: "6",
            label: (
                <NavLink
                to="/messages"
                className="cursor-pointer w-full text-sm text-darkColor"
              >
                Messages
              </NavLink>
               
            ),
            icon:<MessageOutlined />

          }, 
      ];

      const itemsBuyer = [
        {
            key: "logo",
            label: (
                <p
                className="cursor-pointer w-full text-[34px] text-[#FFFFFF] font-bold"
              >
                {`${!collapsed ? "ServiceLance" : "S"}  `}
              </p>
            ),
            className:"logoDash"
          },
        {
            key: "1",
            label: (
                <NavLink
                to="/"
                className="cursor-pointer w-full text-sm text-darkColor"
              >
                Home
              </NavLink>
               
            ),
            icon:<HomeOutlined />

          },
          {
            key: "2",
            label: (
                <NavLink
                to="/dashboard"
                className="cursor-pointer w-full text-sm text-darkColor"
              >
                Dashboard
              </NavLink>
               
            ),
            icon:<BarChartOutlined />,

          },
          {
            key: "3",
            label: (
                <NavLink
                to="/orders"
                className="cursor-pointer w-full text-sm text-darkColor"
              >
                Orders
              </NavLink>
               
            ),
            icon:<ShoppingCartOutlined />
          },
          {
            key: "4",
            label: (
                <NavLink
                to="/messages"
                className="cursor-pointer w-full text-sm text-darkColor"
              >
                Messages
              </NavLink>
               
            ),
            icon:<MessageOutlined />
          },
          
      ];
  return (
    <>
    <Sider
        collapsible
        width={300}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          className="pt-10"
        //   defaultSelectedKeys={["2"]}
        selectedKeys={[location.pathname]}
          mode="inline"
          items={authUser?.isSeller ? itemsSeller : itemsBuyer} 
        />
      </Sider>
    </>
  )
}

export default Sidebar