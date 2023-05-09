import React, { useState } from "react";
import PageLayout from "../componets/layout/PageLayout";
import UsersPage from "./UsersPage";

function HomePage() {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <PageLayout title="Home">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4">
          <UsersPage />
        </div>
      </div>
    </PageLayout>
  );
}

export default HomePage;
