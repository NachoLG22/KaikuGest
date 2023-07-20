import React from "react";
import { Link } from "react-router-dom";

function BudgetItem({ budget }) {
  return (
    <>
      <div className="flex flex-col space-y-4 border border-gray-200 rounded-lg p-4 dark:border-gray-700">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h5 className="text-xl font-medium text-gray-500 dark:text-gray-400">
            {budget.project.title}
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-5xl font-extrabold tracking-tight">
              {budget.totalBudget}
            </span>
            <span className="text-3xl font-semibold">€</span>
          </div>
          <button
            type="button"
            className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-900 font-medium  w-40 h-12 flex items-center justify-center"
          >
            Modifiquied
          </button>
          <button
            type="button"
            className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-900 font-medium  w-40 h-12 flex items-center justify-center"
          >
            Facturar
          </button>
        </div>
      </div>
    </>
  );
}

export default BudgetItem;
