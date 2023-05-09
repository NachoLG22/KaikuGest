import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usersService from "../../services/users";

function UserDetail() {
  const [user, setUser] = useState();
  const { userId } = useParams();
  const navigate = useNavigate();
  

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await usersService.detail(userId);
        setUser(user);
      } catch (error) {
        console.error(error);
        const statusCode = error.response?.status;
        if (statusCode === 404) {
          navigate("/projects");
        }
      }
    }
    fetchUser();
  }, [userId]);

  return (
    <div className="bg-gray-100 min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-blue-200 rounded-full flex flex-shrink-0 justify-center items-center text-blue-500 text-2xl font-mono">
                {user && user.name[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user && user.name}
                </h2>
                <p className="text-gray-600">{user && user.email}</p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <span className="font-bold mb-2">Username:</span>
                  <span>{user && user.username}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold mb-2">Fiscal Name:</span>
                  <span>{user && user.fiscalname}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold mb-2">Description:</span>
                  <span>{user && user.description}</span>
                </div>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="h-5 w-5 fill-current text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.78,8.16a1,1,0,0,0-1.41-.12L10,14.5,6.63,11.13a1,1,0,1,0-1.41,1.41l3.54,3.54a1,1,0,0,0,1.41,0l9.73-9.73A1,1,0,0,0,19.78,8.16Z" />
                  </svg>
                  <span>Verified account</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
