import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthStore";
import {
  faHome,
  faProjectDiagram,
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faBars,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";


const renderNavLinkclassName = ({ isActive }) =>
  isActive ? "nav-link active" : "nav-link";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const links = [
    { to: "/", icon: faHome, text: "Home" },
    { to: "/projects", icon: faProjectDiagram, text: "Projects" },
    { to: "/profile", icon: faUser, text: "About Me" },
 
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-64">
      <div className="flex items-center justify-between h-16 px-4 bg-gray-900 text-white">
        <span className="text-2xl font-bold">KAIKUGEST</span>
        <button className="text-gray-500 hover:text-white focus:text-white focus:outline-none">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <nav className="flex-grow bg-gray-800 pb-4 md:block md:pb-0 md:overflow-y-auto">
        <div className="px-2 py-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={link.icon} className="mr-3" />
              {link.text}
            </NavLink>
          ))}
        </div>
        <div className="px-2 py-4 space-y-1">
          {user?.email ? (
            <div>
              <button className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700">
                <NavLink
                  to="/create-project"
                >
                  Create Project
                </NavLink>
              </button>
              <br />
              <span className="flex items-center px-2 py-2 text-sm font-medium text-gray-300">
                <FontAwesomeIcon icon={faUser} className="mr-3" />
                {user.name}
              </span>
              <button
                onClick={() => logout()}
                className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                Logout
              </button>
            </div>
          ) : (
            <div>
              <NavLink
                to="/login"
                className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-3" />
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
                Sign up
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
