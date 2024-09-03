import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsTrash, BsPencil, BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { columns } from "../../data/data";
import useAuthStore from "../../stores";
import loader from "../../assets/icons/loader.svg";
import requests from "../../libs/request";
import { Axios } from "../../config";
import { Layout, theme, Dropdown, Menu } from "antd";
import HeaderDashboard from "../../components/Header/Header";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGigData } from "../../redux/reducers/DataSave";
const { Header, Content } = Layout;

const MyGigs = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gigData = useSelector((state) => state.dataSave.gigData);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const queryClient = useQueryClient();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      Axios.get(`${requests.gigs}?userId=${authUser._id}`).then(
        (res) => res.data
      ),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return Axios.delete(`${requests.gigs}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      toast.success("Gig deleted successfully");
    },
  });

  const getGigData = async (id) => {
    try {
      const response = await axios.get(
        `https://fyp-testing-server.vercel.app${requests.gigs}/single/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      dispatch(setGigData(response.data)); // Dispatch action to update Redux store
      return response.data;
    } catch (error) {
      console.error("Failed to fetch gig data:", error);
      throw error;
    }
  };

  const handleDelete = (id) => {
    mutation.mutate(id);
  };
  const handleEdit = (id) => {
    getGigData(id);
    navigate("/edit-service");
  };

  useEffect(() => {
    refetch();
  }, []);

  const tableActions = data?.map((item) => ({
    image: (
      <div className="w-14 h-14">
        <img
          src={item.cover}
          alt={item.title}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    ),
    title: (
      <p className="w-full flex items-center justify-start text-left">
        {item.title}
      </p>
    ),
    price: (
      <p className="w-full flex items-center justify-start">{item.price}</p>
    ),
    orders: (
      <p className="w-full flex items-center justify-start">{item.sales}</p>
    ),
    actions: (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              key="edit"
              icon={<BsPencil size={16} />}
              onClick={() => handleEdit(item._id)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              key="delete"
              icon={<BsTrash size={16} />}
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <div className="w-full flex items-center justify-start cursor-pointer">
          <BsThreeDots size={20} />{" "}
          {/* This icon will show up as the trigger for the dropdown */}
        </div>
      </Dropdown>
    ),
  }));

  // Define handleEdit function for editing action

  return (
    <Layout>
      <ToastContainer position="top-right" toastId={1} autoClose={1000} />
      <HeaderDashboard />
      <Content
        style={{
          margin: "0 16px",
        }}
      >
        <div className="w-full flex flex-col items-start gap-5 justify-start">
          <div className="flex items-center justify-between w-full gap-2">
            <h2 className="text-2xl font-bold my-10">Services</h2>
            <Link to="/add">
              <button className="bg-primary/80 py-3 px-2 text-white outline-none rounded-md text-sm hover:bg-primary w-fit transition-all duration-300">
                Add New Service
              </button>
            </Link>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center w-full">
              <img src={loader} alt="/" className="w-[40px]" />
            </div>
          ) : error ? (
            <p className="text-2xl text-red-400 font-normal">
              Error : Something went wrong
            </p>
          ) : (
            <>
              {data?.length === 0 ? (
                <div className="flex items-center justify-center mt-5 flex-col w-full">
                  <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-4344461-3613889.png"
                    alt="/"
                    className="w-full md:w-[350px]"
                  />
                  <h2 className="text-4xl text-active font-medium">
                    No Orders!
                  </h2>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="h-[35px]">
                    <tr>
                      {columns &&
                        columns.map((head, i) => (
                          <th
                            key={i}
                            className="text-left text-gray-700 text-sm font-semibold leading-[18px] pb-2"
                          >
                            {head.header}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {tableActions &&
                      tableActions.map((row, i) => (
                        <tr
                          key={i}
                          className="text-sm leading-5 w-full even:bg-gray-200"
                        >
                          {columns?.map((col, i) => (
                            <td
                              key={i}
                              className="first:text-left text-sm text-darkColor font-medium text-center py-2"
                            >
                              {row[col.field]}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default MyGigs;
