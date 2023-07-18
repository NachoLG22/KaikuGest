import React, { useState } from "react";
import { useForm } from "react-hook-form";
import budgetsService from "../../../services/budgets";
import { useParams, useNavigate } from "react-router-dom";

function BudgetForm() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [serverError, setServerError] = useState(undefined);

  const addItem = () => {
    setItems([
      ...items,
      {
        title: "",
        description: "",
        amount: 0,
        price: 0,
        total: 0,
      },
    ]);
  };
  const navigate = useNavigate();

  const onBudgetSubmit = async (budget) => {
    try {
      setServerError();
      console.debug("Creating Budget...");
      budget = await budgetsService.create(id, budget);
      navigate("/projects", { state: { budget } });
    } catch (error) {
      const errors = error.response?.data?.errors;
      if (errors) {
        Object.keys(errors).forEach((inputName) =>
          setError(inputName, { message: errors[inputName] })
        );
      } else {
        setServerError(error.message);
      }
    }
  };

  return (
    <div class="bg-white shadow-lg rounded-lg overflow-hidden border-gray-200">
      <div className="mb-4 card border-gray-200">
        <h2 className="text-2xl font-bold">New Budget</h2>
      </div>
      <div className="m-4 card border-gray-200">
        <form onSubmit={handleSubmit(onBudgetSubmit)} className="space-y-4">
          {serverError && (
            <div className="alert alert-danger d-none d-lg-block">
              {serverError}
            </div>
          )}
          <div className="m-1 card border-gray-200">
            <h5>Items</h5>
          </div>
          <div className="m-1 card border-gray-200">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`items[${index}].title`}>
                    <b>
                      <u>Title</u>
                    </b>
                  </label>
                  <input
                    {...register(`items[${index}].title`, { required: true })}
                    defaultValue={item.title}
                    className="w-full px-3 py-2 border rounded-md border-gray-400"
                  />
                  {errors?.items?.[index]?.title && (
                    <span>This field is required</span>
                  )}
                  <label htmlFor={`items[${index}].description`}>
                    <b>
                      <u>Description</u>
                    </b>
                  </label>
                  <textarea
                    {...register(`items[${index}].description`, {
                      required: true,
                    })}
                    defaultValue={item.description}
                    className="w-full px-3 py-2 border rounded-md border-gray-400"
                  />
                  {errors?.items?.[index]?.description && (
                    <span>This field is required</span>
                  )}
                </div>
                <div>
                  <label htmlFor={`items[${index}].amount`}>
                    <b>
                      <u>Amount UD</u>
                    </b>
                  </label>
                  <input
                    type="number"
                    {...register(`items[${index}].amount`, { required: true })}
                    defaultValue={item.amount}
                    className="w-full px-3 py-2 border rounded-md border-gray-400"
                  />
                  {errors?.items?.[index]?.amount && (
                    <span>This field is required</span>
                  )}
                  <label htmlFor={`items[${index}].price`}>
                    <b>
                      <u>Price $</u>
                    </b>
                  </label>
                  <input
                    type="number"
                    {...register(`items[${index}].price`, { required: true })}
                    defaultValue={item.price}
                    className="w-full px-3 py-2 border rounded-md border-gray-400"
                  />
                  {errors?.items?.[index]?.price && (
                    <span>This field is required</span>
                  )}
                  <label htmlFor={`items[${index}].total`}>
                    <b>Total $</b>
                  </label>
                  <input
                    type="number"
                    {...register(`items[${index}].total`, { required: true })}
                    defaultValue={item.total}
                    className="w-full px-3 py-2 border rounded-md border-gray-400"
                  />
                  {errors?.items?.[index]?.total && (
                    <span>This field is required</span>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center px-4 py-2 text-white bg-gray-500 rounded-md"
              >
                <i class="fas fa-plus mr-2"></i>
                Add Item
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-gray-800 rounded-md"
              >
                Create Budget
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BudgetForm;
