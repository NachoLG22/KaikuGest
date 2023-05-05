import React, { useState } from "react";
import { useForm } from "react-hook-form";
import budgetsService from "../../../services/budgets";
import { useParams, useNavigate } from "react-router-dom";


function BudgetForm() {

   const { projectId } = useParams();
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
      budget = await budgetsService.create(projectId, budget);
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
    <form onSubmit={handleSubmit(onBudgetSubmit)} className="space-y-4">
      {serverError && (
        <div className="alert alert-danger d-none d-lg-block">
          {serverError}
        </div>
      )}
      Items
      <div>
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <label htmlFor={`items[${index}].title`}>Title</label>
            <input
              {...register(`items[${index}].title`, { required: true })}
              defaultValue={item.title}
              className="w-full px-3 py-2 border rounded-md border-gray-400"
            />
            {errors?.items?.[index]?.title && (
              <span>This field is required</span>
            )}
            <label htmlFor={`items[${index}].description`}>Description</label>
            <input
              {...register(`items[${index}].description`, { required: true })}
              defaultValue={item.description}
              className="w-full px-3 py-2 border rounded-md border-gray-400"
            />
            {errors?.items?.[index]?.description && (
              <span>This field is required</span>
            )}
            <label htmlFor={`items[${index}].amount`}>Amount</label>
            <input
              type="number"
              {...register(`items[${index}].amount`, { required: true })}
              defaultValue={item.amount}
              className="w-full px-3 py-2 border rounded-md border-gray-400"
            />
            {errors?.items?.[index]?.amount && (
              <span>This field is required</span>
            )}
            <label htmlFor={`items[${index}].price`}>Price</label>
            <input
              type="number"
              {...register(`items[${index}].price`, { required: true })}
              defaultValue={item.price}
              className="w-full px-3 py-2 border rounded-md border-gray-400"
            />
            {errors?.items?.[index]?.price && (
              <span>This field is required</span>
            )}
            <label htmlFor={`items[${index}].total`}>Total</label>
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
        ))}
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
        >
          Add Item
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-gray-800 rounded-md"
        >
          Create Budget
        </button>
      </div>
    </form>
  );
}

export default BudgetForm;
