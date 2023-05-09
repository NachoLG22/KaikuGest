import React from 'react';
import PageLayout from '../componets/layout/PageLayout';
import UserDetailOpen from '../componets/users/UserDetailOpen';

function UserPage() {
  return (
    <PageLayout title="Profesionales">
      <UserDetailOpen />
    </PageLayout>
  )
}

export default UserPage