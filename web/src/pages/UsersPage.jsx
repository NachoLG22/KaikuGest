import React, { useEffect, useState } from "react";
import PageLayout from "../componets/layout/PageLayout";
import UsersList from "../componets/users/UsersList";
import usersService from "../services/users";
import { useSearchParams } from "react-router-dom";

function UsersPage() {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const query = {};
    usersService
      .list(query)
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => console.error(error));
  }, [searchParams]);

  return (
    <div className="w-full max-w-md  m-2p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-600">
      <div className="flex items-center justify-between mb-5">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Profesionales Disponibles:
        </h5>
      </div>
      <div className="flow-root overflow-y-auto h-70">
        <ul role="list" className="max-h-60 overflow-auto hide-scroll-bar">
          <li className="py-3 sm:py-4">
            <UsersList users={users} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UsersPage;
