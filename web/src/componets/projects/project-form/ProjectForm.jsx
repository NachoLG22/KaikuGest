import React, { useState } from "react";
import { useForm } from "react-hook-form";
import projectsService from "../../../services/projects";
import { useNavigate } from "react-router-dom";

function ProjectForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();

  const [serverError, setServerError] = useState(undefined);

  const onProjectSubmit = async (project) => {
    try {
      setServerError();
      console.debug("Creating Project...");
      project = await projectsService.create(project);
      navigate("/projects", { state: { project } });
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

  const inputClassForm =
    "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <form onSubmit={handleSubmit(onProjectSubmit)}>
      {serverError && (
        <div className="alert alert-danger d-none d-lg-block">
          {serverError}
        </div>
      )}
      {/*Title */}
      <div className="relative z-0 mb-6">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-400"
        >
          Project Title
        </label>
        <input
          id="title"
          type="text"
          className={`${inputClassForm} ${
            errors.title ? "border-red-600" : ""
          } block w-full p-4 text-gray-800 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder=" "
          {...register("title", {
            required: "Project title is required",
          })}
        />
        {errors.title && (
          <div className="text-red-600">{errors.title?.message}</div>
        )}
      </div>

      {/*DESCRIPTION */}
      <div className="relative z-0 mb-6">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-400"
        >
          Project Description
        </label>
        <input
          id="description"
          type="text"
          className={`${inputClassForm} ${
            errors.description ? "border-red-600" : ""
          } block w-full p-4 text-gray-800 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder=" "
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <div className="text-red-600">{errors.description?.message}</div>
        )}
      </div>

      {/*CLIENT */}
      <div className="relative z-0 mb-6">
        <label
          htmlFor="client"
          className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-400"
        >
          Client
        </label>
        <input
          id="client"
          type="text"
          className={`${inputClassForm} ${
            errors.client ? "border-red-600" : ""
          } block w-full p-4 text-gray-800 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder=" "
          {...register("client", {
            required: "Client is required",
          })}
        />
        {errors.client && (
          <div className="text-red-600">{errors.client?.message}</div>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-gray-500 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create
      </button>
    </form>
  );
}

export default ProjectForm;
