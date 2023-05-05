import React from "react";
import UserItem from "./UserItem";

function UsersList({ users }) {
  return (
    <>
      {users.map((user) => (
        <UserItem user={user} key={user.id} />
      ))}
    </>
  );
}

export default UsersList;
