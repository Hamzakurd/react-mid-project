import { useAuth } from "../Hooks/UseAuth";
import toast from "react-hot-toast";
import { UsersContext } from "./UsersContext";

export const UsersProvider = ({ children }) => {

  const {
    users,
    setUsers,
    currentUser,
    setCurrentUser
  } = useAuth();

  // DELETE USER

  const deleteUser = async (id) => {
    try {

      const updatedUsers = users.filter(
        (user) => user.id !== id
      );

      if (updatedUsers.length === users.length) {
        toast.error("User not found!");
        return false;
      }

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );

      setUsers(updatedUsers);

      if (currentUser?.id === id) {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
      }

      toast.success("User deleted successfully!");

      return true;

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user!");
      return false;
    }
  };

  // UPDATE USER ROLE

  const updateUser = async (id, newRole) => {
    try {

      const user = users.find(
        (user) => user.id === id
      );

      if (!user) {
        toast.error("User not found!");
        return false;
      }

      if (!["user", "admin"].includes(newRole)) {
        toast.error("Please select a valid role!");
        return false;
      }

      const updatedUsers = users.map((user) =>
        user.id === id
          ? { ...user, role: newRole }
          : user
      );

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );

      setUsers(updatedUsers);

      if (currentUser?.id === id) {
        const updatedCurrentUser = {
          ...currentUser,
          role: newRole
        };

        setCurrentUser(updatedCurrentUser);

        localStorage.setItem(
          "currentUser",
          JSON.stringify(updatedCurrentUser)
        );
      }

      toast.success("User role updated!");

      return true;

    } catch (error) {
      console.error(error);
      toast.error("Failed to update user!");
      return false;
    }
  };

  return (
    <UsersContext.Provider
      value={{
        deleteUser,
        updateUser
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};