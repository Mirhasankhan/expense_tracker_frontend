import React, { useState } from "react";
import AddExpenseForm from "./AddExpense";
import AllExpenses from "./AllExpenses";

const Overview = () => {
  const [active, setActive] = useState("overview");
  return (
    <div>
      <div className="flex w-full justify-between md:w-fit p-1 rounded-[6px] bg-gray-100 mt-12 font-medium gap-6">
        <button
          onClick={() => setActive("overview")}
          className={`${
            active == "overview" && "bg-white border-2 border-primary"
          } px-12 rounded-[6px] py-1`}
        >
          Overview
        </button>
        <button
          onClick={() => setActive("add")}
          className={`${
            active == "add" && "bg-white border-2 border-primary"
          } px-12 rounded-[6px] py-1`}
        >
          Add Expense
        </button>
      </div>
      {
        active == "add" ? <AddExpenseForm></AddExpenseForm> : <AllExpenses></AllExpenses>
      }
    </div>
  );
};

export default Overview;
