import React from "react";
import { MdMail } from "react-icons/md";
import { ordersColumns } from "../../data/data";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "../../config";
import requests from "../../libs/request";
import useAuthStore from "../../stores";
import loader from "../../assets/icons/loader.svg";
import { useNavigate } from "react-router-dom";
import { Layout, Tag, Dropdown, Menu, theme } from "antd";
import HeaderDashboard from "../../components/Header/Header";
import { toast, ToastContainer } from "react-toastify";
const { Header, Content } = Layout;

const Orders = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => Axios.get(`${requests.orders}`).then((res) => res.data),
  });

  const mutation = useMutation(
    ({ id, orderStatus }) =>
      Axios.put(`${requests.orders}/status/${id}`, { orderStatus }),
    {
      onSuccess: (orderStatus) => {
        queryClient.refetchQueries(["orders"]);
        toast.success(
          `The order has status ${
            orderStatus === true ? "Completed" : "Incompleted"
          }.`
        );
      },
      onError: (error) => {
        console.error(
          "Failed to update status",
          error.response ? error.response.data : error.message
        );
        toast.error('There was an error updating the order status. Please try again.');
      },
    }
  );

  const handleStatusChange = (item, key) => {
    const newStatus = key === "completed";
    mutation.mutate({ id: item._id, orderStatus: newStatus });
  };

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    try {
      const res = await Axios.get(`${requests.conversations}/single/${id}`);
      navigate(`/messages/${res.data.id}`);
    } catch (err) {
      if (err?.response?.status === 404) {
        const res = await Axios.post(`${requests.conversations}/`, {
          to: authUser.seller ? buyerId : sellerId,
        });
        navigate(`/messages/${res.data.id}`);
      }
    }
  };

  const statusMenu = (item) => (
    <Menu onClick={({ key }) => handleStatusChange(item, key)}>
      <Menu.Item key="completed">
        <Tag color="#87d068">Completed</Tag>
      </Menu.Item>
      <Menu.Item key="incompleted">
        <Tag color="#f50">Pending</Tag>
      </Menu.Item>
    </Menu>
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();
  
    return `${day}-${month}-${year}`;
  };
  const tableActions = data?.map((item) => ({
    image: (
      <div className="w-14 h-14">
        <img
          src={item.img}
          alt={item.username}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    ),
    title: (
      <p className="w-full flex items-center justify-start">{item.title}</p>
    ),
    price: (
      <p className="w-full flex items-center justify-start">{item.price}</p>
    ),
    order_date: (
      <p className="w-full flex items-center justify-start">{formatDate(item.createdAt)}</p>
    ),
    actions: (
      <div
        className="w-8 h-8 cursor-pointer bg-blue-600 rounded-full flex items-center justify-center text-white"
        onClick={() => handleContact(item)}
      >
        <MdMail size={18} />
      </div>
    ),
    status: (
      <>
      {authUser.isSeller === true ? 
        <Dropdown overlay={statusMenu(item)} trigger={["click"]}>
        <div className="w-8 h-8 cursor-pointer flex items-center justify-center text-white">
          <Tag color={item.orderStatus === false ? "#f50" : "#87d068"}>
            {item.orderStatus === false ? "Pending" : "Completed"}
          </Tag>
        </div>
      </Dropdown>
    :
    <div className="w-8 h-8 flex items-center justify-center text-white">
    <Tag color={item.orderStatus === false ? "#f50" : "#87d068"}>
      {item.orderStatus === false ? "Pending" : "Completed"}
    </Tag>
  </div>
    }
    </>
    ),
  }));

  return (
    <Layout>
      <ToastContainer position="top-right" toastId={1} autoClose={1000} />
      <Content
        style={{
          margin: "0 16px",
        }}
      >
        <HeaderDashboard />
        <div className="flex items-center justify-between w-full gap-2">
          <h2 className="text-2xl font-bold my-5 mt-10">Orders</h2>
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
                  className="w-[350px]"
                />
                <h2 className="text-4xl text-active font-medium">
                  No Order Data
                </h2>
              </div>
            ) : (
              <div className="border p-5 rounded-2xl flex justify-center bg-gray-300 shadow-lg">
              <table className="w-full">
                <thead className="h-[35px]">
                  <tr>
                    {ordersColumns &&
                      ordersColumns.map((head, i) => (
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
                        {ordersColumns?.map((col, i) => (
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
            </div>
            
            )}
          </>
        )}
      </Content>
    </Layout>
  );
};

export default Orders;
