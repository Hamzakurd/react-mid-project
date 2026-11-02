import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import Home from "./components/Pages/Home";
import AllCars from "./components/Pages/AllCars";
import CarDetail from "./components/Pages/CarDetail";
import Chargers from "./components/Pages/Chargers";
import About from "./components/Pages/About";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import DisplayProducts from "./components/Admin/DisplayProduct";
import DisplayUsers from "./components/Admin/DisplayUsers";
import ManageCars from "./components/Admin/ManageCars";
import ManageChargers from "./components/Admin/ManageChargers";

import { useAuth } from "./components/Hooks/UseAuth";

function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/Login" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AllCars" element={<AllCars />} />
        <Route path="/car-details/:brand" element={<CarDetail />} />
        <Route path="/Chargers" element={<Chargers />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Route>

      <Route
        path="/admin-dashboard"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="manage-users"
          element={<DisplayUsers />}
        />

        <Route
          path="manage-products"
          element={<DisplayProducts />}
        />

        <Route
          path="manage-cars"
          element={<ManageCars />}
        />

        <Route
          path="manage-chargers"
          element={<ManageChargers />}
        />
      </Route>
    </Routes>
  );
}

export default App;