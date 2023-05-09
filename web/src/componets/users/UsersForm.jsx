import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usersService from "../../services/users";

function UsersForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [serverError, setServerError] = useState(undefined);
  const navigate = useNavigate();

  const onUserSubmit = async (user) => {
    try {
      setServerError(undefined);
      console.debug("Registering...");
      user = await usersService.create(user);
      navigate("/login", { state: { user } });
    } catch (error) {
      const errors = error.response?.data?.errors;
      if (errors) {
        console.error(error.message, errors);
        Object.keys(errors).forEach((inputName) =>
          setError(inputName, { message: errors[inputName] })
        );
      } else {
        console.error(error);
        setServerError(error.message);
      }
    }
  };

  const inputClassForm =
    "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  const inputClassImgForm =
    "border border-gray-300 rounded-lg px-3 py-2 leading-4 text-sm text-gray-700 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out";

  return (
    <form onSubmit={handleSubmit(onUserSubmit)}>
      {serverError && (
        <div className="alert alert-danger d-none d-lg-block">
          {serverError}
        </div>
      )}
      {/* Image

      <div className="relative z-0 w-full md:w-1/2 mb-6 group">
        <input
          type="file"
          className={`${inputClassImgForm} ${
            errors.image ? "placeholder-red-600" : ""
          }`}
          placeholder="Select an image"
          {...register("image", {
            required: "Image is required",
          })}
        />
        {errors.image && (
          <div className="text-red-600">{errors.image?.message}</div>
        )}
      </div> */}

      {/*NAME */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          className={`${inputClassForm} ${
            errors.name ? "placeholder-red-600" : ""
          }`}
          placeholder=" "
          {...register("name", {
            required: "User name is required",
          })}
        />
        {errors.name && (
          <div className="text-red-600">{errors.name?.message}</div>
        )}
        <label
          for="floating_anme"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Your Name
        </label>
      </div>

      {/*FISCALNAME */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          className={`${inputClassForm} ${
            errors.fiscalname ? "placeholder-red-600" : ""
          }`}
          placeholder=" "
          {...register("fiscalname", {
            required: "Fiscal name is required",
          })}
        />
        {errors.fiscalname && (
          <div className="text-red-600">{errors.fiscalname?.message}</div>
        )}
        <label
          for="floating_fiscalname"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Your Fiscal Name
        </label>
      </div>

      {/*EMAIL */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          className={`${inputClassForm} ${
            errors.email ? "placeholder-red-600" : ""
          }`}
          placeholder=" "
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <div className="text-red-600">{errors.email?.message}</div>
        )}
        <label
          for="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          example@mail.com
        </label>
      </div>

      {/*PASSWORD */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          className={`${inputClassForm} ${
            errors.password ? "placeholder-red-600" : ""
          }`}
          placeholder=" "
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <div className="text-red-600">{errors.password?.message}</div>
        )}
        <label
          for="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Your password
        </label>
      </div>
      {/*DESCRIPTION */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          className={`${inputClassForm} ${
            errors.description ? "placeholder-red-600" : ""
          }`}
          placeholder=" "
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <div className="text-red-600">{errors.description?.message}</div>
        )}
        <label
          for="floating_description"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Your description
        </label>
      </div>
      {/* LOCATION
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          className={`${inputClassForm} ${
            errors.location ? "placeholder-red-600" : ""
          }`}
          placeholder=" "
          {...register("location", {
            required: "location is required",
          })}
        />
        {errors.location && (
          <div className="text-red-600">{errors.location?.message}</div>
        )}
        <label
          for="floating_location"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Your location
        </label>
      </div> */}

      <button
        type="submit"
        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        Register
      </button>
    </form>
  );
}

export default UsersForm;
