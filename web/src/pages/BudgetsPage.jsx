import React, { useState, useEffect } from "react";
import PageLayout from "../componets/layout/PageLayout";
import BudgetList from "../componets/budgets/buddets-list/BudgetList";
import budgetsService from "../services/budgets";
import { useSearchParams } from "react-router-dom";

function BudgetsPage() {
  const [searchParams] = useSearchParams();
  const [budgets, setBudgets] = useState([]);
  

  useEffect(() => {
    const query = {};
    budgetsService
      .list(query)
      .then((budgets) => {
        setBudgets(budgets);
      })
      .catch((error) => console.error(error));
  }, [searchParams]);

  console.log(budgets);

  return (
    <PageLayout title="Show these awesome projects">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-600">
        <div className="flex items-center justify-between mb-5">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Presupuestos:
          </h5>
        </div>
        <div className="flow-root">
          <ul role="list" className="max-h-60 overflow-auto hide-scroll-bar">
            <li className="py-3 sm:py-4">
              <BudgetList budgets={budgets} />
            </li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}

export default BudgetsPage;
