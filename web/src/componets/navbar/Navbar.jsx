import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/img/Logo.jpg";


function Navbar() {
  return (
    <nav className="bg-gray-50 dark:bg-gray-700">
      <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
          <img src={logo} alt="KaikuGest" width="30" height="30" />
          <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Company
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Team
              </a>
            </li>
            <li className="text-gray-900 dark:text-white hover:underline">
              <NavLink to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
