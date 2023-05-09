import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usersService from "../../services/users";
import { AuthContext } from "../../contexts/AuthStore";

function UsersLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [serverError, setServerError] = useState(undefined);
  const { onUserChange } = useContext(AuthContext);

  const onLoginSubmit = async (user) => {
    try {
      setServerError();
      user = await usersService.login(user);
      onUserChange(user);
      navigate("/projects");
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
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <form onSubmit={handleSubmit(onLoginSubmit)}>
      {serverError && (
        <div className="alert alert-danger d-none d-lg-block">
          {serverError}
        </div>
      )}
      {/*EMAIL */}
      <div className="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="text"
          className={`${inputClassForm} ${
            errors.email ? "placeholder-red-600" : ""
          }`}
          placeholder=""
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <div className="text-red-600">{errors.email?.message}</div>
        )}
      </div>

      {/*PASSWORD */}
      <div className="mb-6">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password:
        </label>
        <input
          type="password"
          className={`${inputClassForm} ${
            errors.password ? "placeholder-red-600" : ""
          }`}
          placeholder=""
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <div className="text-red-600">{errors.password?.message}</div>
        )}
      </div>

      <button
        type="submit"
        className="text-group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        Login
      </button>
    </form>
  );
}

export default UsersLogin;
