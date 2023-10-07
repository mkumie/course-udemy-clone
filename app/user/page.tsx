import React from "react";
import myUser from "../actions/getUser";
import ProfileComponent from "./ProfileComponent";

const User = async () => {
  const user = await myUser();

  return (
    <ProfileComponent email={user?.email} name={user?.name} userId={user?.id} />
  );
};

export default User;
