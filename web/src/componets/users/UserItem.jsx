import React from "react";
import { Link } from "react-router-dom";



function UserItem({ user }) {
  return (
    <div className="mx-auto w-full max-w-sm m-3 bg-white border-2 border-gray-800 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 my-2 h-96">
      <div className="flex flex-col items-center pb-10">
        
        <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
          {user.name}
        </h5>
        <span className="text-lg text-gray-500 dark:text-gray-400">
          {user.fiscalname}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <Link to={`/users/${user.id}`}>Detail</Link>
          </button>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >
            Message
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
