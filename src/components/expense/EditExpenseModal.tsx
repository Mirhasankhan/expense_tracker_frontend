import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEditExpenseMutation } from "@/redux/features/expense/expense.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { TExpense } from "./AllExpenses";
import { Pencil } from "lucide-react";
import { useEffect } from "react";

const UpdateExpenseModal = ({ expense }: { expense: TExpense }) => {
  const [updateExpense, { isLoading }] = useEditExpenseMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TExpense>({
    defaultValues: {
      title: expense.title || "",
      amount: expense.amount,
      date: expense.date
        ? new Date(expense.date).toISOString().split("T")[0]
        : "",
      category: expense.category || "",
    },
  });
  useEffect(() => {
    if (expense) {
      reset({
        title: expense.title,
        amount: expense.amount,
        date: expense.date
          ? new Date(expense.date).toISOString().split("T")[0]
          : "",
        category: expense.category,
      });
    }
  }, [expense, reset]);

  const onSubmit: SubmitHandler<TExpense> = async (data) => {
    const response: any = await updateExpense({
      id: expense._id,
      data: data,
    });
    console.log(response);
    
    if (response?.data?.success) {
      toast.success("response.data.message");
      reset();
    } 
    else {
        console.log(response.errors);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary w-full font-medium p-1 rounded-[4px] text-white">
         <Pencil size={15}/>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{expense.title}</DialogTitle>
          <DialogDescription>Update Expense Details</DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <div className="w-full mb-3">
              <label className="block pb-1 font-medium">Title</label>
              <input
                className="input-design"
                type="text"
                placeholder="Expense title"
                {...register("title", {
                  required: "Title is required",
                })}
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>

            {/* Amount */}
            <div className="w-full mb-3">
              <label className="block pb-1 font-medium">Amount</label>
              <input
                className="input-design"
                type="number"
                placeholder="Enter amount"
                {...register("amount", {
                  required: "Amount is required",
                  min: { value: 1, message: "Amount must be at least 1" },
                  valueAsNumber: true,
                })}
              />
              {errors.amount && (
                <span className="text-red-500">{errors.amount.message}</span>
              )}
            </div>

            {/* Category */}
            <div className="w-full mb-3">
              <label className="block pb-1 font-medium">Category</label>
              <select
                className="input-design"
                {...register("category", {
                  required: "Category is required",
                })}
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Transport">Transport</option>
                <option value="Others">Others</option>
              </select>
              {errors.category && (
                <span className="text-red-500">{errors.category.message}</span>
              )}
            </div>

            {/* Date */}
            <div className="w-full mb-3">
              <label className="block pb-1 font-medium">Date</label>
              <input
                className="input-design"
                type="date"
                {...register("date", {
                  required: "Date is required",
                })}
              />
              {errors.date && (
                <span className="text-red-500">{errors.date.message}</span>
              )}
            </div>        
            <button
              disabled={isLoading}
              type="submit"
              className="text-white text-center mt-6 w-full bg-primary px-4 py-2 rounded-[6px] font-medium"
            >
              {isLoading ? (
                "Submitting.."
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateExpenseModal;
