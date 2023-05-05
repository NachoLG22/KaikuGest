import React from "react";
import PageLayout from "../componets/layout/PageLayout";
import UserDetail from "../componets/users/UserDetail";

function UserPage() {
  return (
    <PageLayout title="Mi Perfil">
      <UserDetail />
    </PageLayout>
  );
}

export default UserPage;
