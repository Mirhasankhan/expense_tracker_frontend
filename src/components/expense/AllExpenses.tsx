"use client";

import {
  useAllExpensesQuery,
  useDeleteExpenseMutation,
} from "@/redux/features/expense/expense.api";
import { Calendar, Trash } from "lucide-react";
import { toast } from "react-toastify";
import Loading from "./Loading";
import UpdateExpenseModal from "./EditExpenseModal";
import { useState } from "react";

export interface TExpense {
  _id: string;
  category: string;
  title: string;
  date: string;
  amount: number;
}

const AllExpenses = () => {
  const [category, setCategory] = useState("");
  const [search,setSearch] = useState("")
  
  const { data: expenses, isLoading } = useAllExpensesQuery({search,category}, {
    refetchOnMountOrArgChange: true,
  });
  

  const [deleteExpense, { isLoading: isDeleteLoading }] =
    useDeleteExpenseMutation();
  

  const handleDeleteExpense = async (id: string) => {
    const response = await deleteExpense(id);
    if (response.data) {
      toast.success("Expense deleted successfully");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-1 text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-primary focus:outline-none transition";

  return (
    <div>
      <div className="md:flex gap-4 pt-8 pb-4 items-center justify-between">
        <h1 className="text-2xl font-medium">My Expense History</h1>
        <div>
          <div className="flex gap-3">
            <div>
              <label className="block pb-1" htmlFor="">
                Search by title
              </label>
              <input
              onChange={(e)=>setSearch(e.target.value)}
                placeholder="serach title.."
                type="text"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block pb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                <option value="">Select a category</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Transfort">Transfort</option>
                <option value="Others">Others</option>
              </select>           
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {expenses?.data?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {expenses?.data?.map((expense: TExpense) => (
              <div
                className="border-2 rounded-[8px] p-2 md:p-5"
                key={expense._id}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-medium">{expense.title}</h1>
                    <div className="bg-green-800 bg-opacity-10 text-sm text-green-700 px-4 py-1 rounded-full">
                      {expense?.category}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <h1 className="text-xl font-semibold">
                      ${expense?.amount}
                    </h1>
                    <UpdateExpenseModal expense={expense}></UpdateExpenseModal>
                    <button
                      disabled={isDeleteLoading}
                      onClick={() => handleDeleteExpense(expense._id)}
                      className="p-1 rounded-[4px] border"
                    >
                      <Trash size={15}></Trash>
                    </button>
                  </div>
                </div>
                <div className="flex gap-1 py-2 items-center text-gray-500">
                  <Calendar size={20}></Calendar>
                  <h1 className="font-medium">
                    {new Date(expense?.date).toLocaleDateString()}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>{isLoading ? <Loading></Loading> : "No expense found"}</>
        )}
      </div>
    </div>
  );
};

export default AllExpenses;
