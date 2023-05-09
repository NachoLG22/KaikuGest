import React from "react";
import Header from "../header/Header";
import NavbarProject from "../navbar/navbar-project/NavbarProject";

function PageLayout({ title, children }) {
  return (
    <>
      <NavbarProject />
      <div className="bg-gray-3000 w-full h-full">
        <Header title={title} />
        <div className="bg-gray-3000 w-full h-full">{children}</div>
      </div>
    </>
  );
}

export default PageLayout;
