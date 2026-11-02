import { useContext } from "react";
import { UsersContext } from "../Context/UsersContext";

export const useUsers = () => {
  const context = useContext(UsersContext);

  if (context == null) {
    throw new Error(
      "useUsers must be used inside UsersProvider"
    );
  }

  return context;
};