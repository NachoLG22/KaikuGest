import React from "react";
import { Link } from "react-router-dom";

function BudgetItem({ budget }) {
  return (
    <>
      <div>Budget</div>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          {budget.title}
        </h5>
        <div className="flex items-baseline text-gray-900 dark:text-white">
          <span className="text-3xl font-semibold">$</span>
          <span className="text-5xl font-extrabold tracking-tight">
            {budget.total}
          </span>
          <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
            /month
          </span>
        </div>
        <ul role="list" className="space-y-5 my-7">
          {budget.items.map((item) => (
            <li className="flex space-x-3" key={item._id}>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        >
          Choose plan
        </button>
      </div>
    </>
  );
}

export default BudgetItem;
