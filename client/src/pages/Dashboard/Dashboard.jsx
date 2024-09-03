import React, { useState } from "react";
import { Layout, Menu, theme, Dropdown, Button, Space } from "antd";
import HeaderDashboard from "../../components/Header/Header";
import AreaChart from "../../components/Charts/AreaChart";
import DonutChart from "../../components/Charts/DonutChart";
import ComparisonDonutChart from "../../components/Charts/ComparisonDonutChart";
import Orders from "../orders/Orders";
import OrdersSummary from "../../components/Dashboard/OrdersSummary";
import useAuthStore from "../../stores";
import BarChart from "../../components/Charts/BarChart";
import CountCards from "../../components/Dashboard/CountCards";
const { Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const { authUser } = useAuthStore();

  return (
    <Layout>
      <Content
        style={{
          margin: "0 16px",
        }}
      >
        <HeaderDashboard />
        <div className="my-10 text-3xl font-bold">Dashboard</div>
        <div className="w-[100%] flex justify-between">
          
          <CountCards title="Total Orders" count="10" />
          <CountCards title="Total Sales (PKR)" count="3000" />

        </div>
        <div
          className="w-full
            "
        >
          {authUser.isSeller ? <AreaChart /> : <BarChart />}
        </div>
        <div className="mt-10 mb-5 flex justify-around">
          <div className="w-[30%]  bg-white rounded-3xl">
            <DonutChart />
          </div>
          <div className="w-[30%]  bg-white rounded-3xl">
            <ComparisonDonutChart />
          </div>
        </div>
        <div className="my-10 bg- rounded-3xl shadow-lg">
          <OrdersSummary />
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
