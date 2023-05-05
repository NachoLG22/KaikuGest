import React from "react";
import Header from "../header/Header";

function PageLayout({ title, children }) {
  return (
    <div className="bg-gray-200 w-full h-full">
      <Header title={title} />
      <div className="container">{children}</div>
    </div>
  );
}

export default PageLayout;
