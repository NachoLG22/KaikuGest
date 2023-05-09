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
    <div className="border m-5 border-gray-300 rounded-lg shadow-lg p-4 my-4">
      <form onSubmit={handleSubmit(onProjectSubmit)} className="space-y-6">
        {serverError && (
          <div className="alert alert-danger d-none d-lg-block">
            {serverError}
          </div>
        )}
        {/*Title */}
        <div className="relative z-0">
          <label
            htmlFor="title"
            className="block text-lg mb-2 font-medium text-gray-700 dark:text-gray-400 border-b"
          >
            <span className="inline-flex items-center">
              <i className="fas fa-pencil-alt mr-2"></i>
              Project Title
            </span>
          </label>
          <input
            id="title"
            type="text"
            className={`${inputClassForm} ${
              errors.title ? "border-red-600" : ""
            } block w-full p-4 text-gray-800 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-2 dark:focus:border-blue-500`}
            placeholder=" "
            {...register("title", {
              required: "Project title is required",
            })}
          />
          {errors.title && (
            <div className="text-red-600">{errors.title?.message}</div>
          )}
        </div>
        {/*Description */}
        <div className="relative z-0">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700 dark:text-gray-400 border-b"
          >
            <span className="inline-flex items-center">
              <i className="fas fa-align-left mr-2"></i>
              Project Description
            </span>
          </label>
          <p>
            Make a short technical description of the project including the most
            relevant parts of the project!.
          </p>
          <textarea
            id="description"
            className={`${inputClassForm} ${
              errors.description ? "border-red-600" : ""
            } block w-full p-4 text-gray-800 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-2 dark:focus:border-blue-500`}
            {...register("description", {
              required: "Project description is required",
            })}
            placeholder=" "
          />
          {errors.description && (
            <div className="text-red-600">{errors.description?.message}</div>
          )}
        </div>

        {/*CLIENT */}
        <div className="mb-6">
          <label
            htmlFor="client"
            className="block text-lg font-medium text-gray-700 dark:text-gray-400 border-b"
          >
            Client
          </label>
          <p>
            Customer's name and address, in case of having a fiscal name, this
            name must be name and address
          </p>
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
    </div>
  );
}

export default ProjectForm;
