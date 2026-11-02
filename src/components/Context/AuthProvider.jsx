import { useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() =>
    readStorage("currentUser", null)
  );

  const [users, setUsers] = useState(() => {
    const savedUsers = readStorage("users", []);
    return Array.isArray(savedUsers) ? savedUsers : [];
  });

  const getAllUsers = () => {
    const savedUsers = readStorage("users", []);
    const updatedUsers = Array.isArray(savedUsers)
      ? savedUsers
      : [];

    setUsers(updatedUsers);
    return updatedUsers;
  };

  // REGISTER
  const register = async (data) => {
    try {
      const name = data.name?.trim();
      const email = data.email?.trim().toLowerCase();
      const password = data.password;
      const confirmPassword = data.confirmPassword;

      if (!name || !email || !password || !confirmPassword) {
        toast.error("Please fill all fields!");
        return false;
      }

      if (name.length < 3) {
        toast.error("Please enter a valid name!");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email!");
        return false;
      }

      const existingUsers = getAllUsers();

      const isExist = existingUsers.some(
        (user) => user.email?.toLowerCase() === email
      );

      if (isExist) {
        toast.error("You already have an account!");
        return false;
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must contain at least 8 characters, uppercase, lowercase, number and symbol."
        );
        return false;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return false;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: "user"
      };

      const updatedUsers = [...existingUsers, newUser];

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);

      toast.success("Registered Successfully!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Registration failed!");
      return false;
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      if (!email?.trim() || !password) {
        toast.error("Please fill all fields!");
        return false;
      }

      const normalizedEmail = email.trim().toLowerCase();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(normalizedEmail)) {
        toast.error("Please enter a valid email!");
        return false;
      }

      const existingUsers = getAllUsers();

      const foundUser = existingUsers.find(
        (user) => user.email?.toLowerCase() === normalizedEmail
      );

      if (!foundUser) {
        toast.error("Email not found!");
        return false;
      }

      if (foundUser.password !== password) {
        toast.error("Incorrect password!");
        return false;
      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify(foundUser)
      );

      setCurrentUser(foundUser);

      toast.success("Login Successfully!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again!");
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    toast.success("Logout Successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        register,
        login,
        logout,
        getAllUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};