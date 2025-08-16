"use client";
import { useCreateExpenseMutation } from "@/redux/features/expense/expense.api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type ExpenseFormData = {
  title: string;
  amount: number;
  category: string;
  date: string;
  description: string;
};

const AddExpenseForm = () => {
  const [addExpense, { isLoading }] = useCreateExpenseMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>();

  const onSubmit = async (data: ExpenseFormData) => {
    const response = await addExpense(data);
    if (response.data) {
      toast.success("Expense listed successfully");
      reset();
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-primary focus:outline-none transition";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Add Expense
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter expense title"
            {...register("title", { required: "Title is required" })}
            className={inputClass}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-2">Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Amount must be at least 1" },
            })}
            className={inputClass}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className={inputClass}
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Transfort">Transfort</option>
            <option value="other">Other</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className={inputClass}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          placeholder="Write a short note about this expense"
          {...register("description")}
          className={inputClass}
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary/90 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-primary hover:shadow-lg transition"
      >
        {isLoading ? "Adding expense..." : " Add Expense"}
      </button>
    </form>
  );
};

export default AddExpenseForm;
