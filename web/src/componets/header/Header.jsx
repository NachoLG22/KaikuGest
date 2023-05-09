import React from "react";

import "./Header.css";

function Header({ title }) {
  return (
    <div className="header container-fluid bg-light">
      <div className="container py-2">
        <h1 className="text-gray 800 text-xl font-bold border-solid border-gray-800 border-2 rounded-lg p-2">
          {title}
        </h1>
      </div>
    </div>
  );
}

export default Header;
