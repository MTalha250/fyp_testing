import React from "react";

const CountCards = (props) => {
const {title, count}  =props;

  return (
    <div className="border w-[48%] h-[250px] text-white rounded-2xl p-5 bg-gradient-to-r from-[#001529] to-[#4A85C0] bg-opacity-30">
    <p className="text-lg">{title}</p>
    <div className="flex flex-col h-[75%]">
      <p className="text-center my-auto text-[70px] font-bold">{count}</p>
    </div>
  </div>
  );
};

export default CountCards;
