"use client"

import { useAllExpensesQuery } from "@/redux/features/expense/expense.api";

const AllExpenses = () => {
    const {data:expenses} = useAllExpensesQuery("")
    console.log(expenses);
    return (
        <div>
          sdfsdf  
        </div>
    );
};

export default AllExpenses;