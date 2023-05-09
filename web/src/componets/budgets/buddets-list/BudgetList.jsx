import React from "react";
import BudgetItem from "../budget-item/BudgetItem";

function BudgetList({ budgets }) {
  return (
    <>
      {budgets.map((budget) => (
        <BudgetItem budget={budget} key={budget.id} />
      ))}
    </>
  );
}

export default BudgetList;
