
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";

import { Box } from "@mui/material";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import Home from "./components/Pages/Home";
import AllCars from "./components/Pages/AllCars";
import CarDetail from "./components/Pages/CarDetail";
import Chargers from "./components/Pages/Chargers";
import About from "./components/Pages/About";
import Shop from "./components/Pages/Shop";
import Cart from "./components/Pages/Cart";
import Checkout from "./components/Pages/Checkout";
import MyOrders from "./components/Pages/MyOrders";
import MyProfile from "./components/Pages/MyProfile";
import Contact from "./components/Contact/Contact";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import DisplayProducts from "./components/Admin/DisplayProduct";
import DisplayUsers from "./components/Admin/DisplayUsers";
import ManageCars from "./components/Admin/ManageCars";
import ManageChargers from "./components/Admin/ManageChargers";
import ManageOrders from "./components/Admin/ManageOrders";
import ManageMessages from "./components/Admin/ManageMessages";

import { useAuth } from "./components/Hooks/UseAuth";

function UserRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  const isLoggedIn =
    currentUser &&
    Object.keys(currentUser).length > 0;

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/Login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  const isLoggedIn =
    currentUser &&
    Object.keys(currentUser).length > 0;

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        color: "text.primary",
        transition: "background-color 0.3s, color 0.3s"
      }}
    >
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          color: "text.primary"
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AllCars" element={<AllCars />} />

        <Route
          path="/car-details/:brand"
          element={<CarDetail />}
        />

        <Route path="/Chargers" element={<Chargers />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Cart" element={<Cart />} />

        <Route
          path="/Checkout"
          element={
            <UserRoute>
              <Checkout />
            </UserRoute>
          }
        />

        <Route
          path="/MyOrders"
          element={
            <UserRoute>
              <MyOrders />
            </UserRoute>
          }
        />

        <Route
          path="/MyProfile"
          element={
            <UserRoute>
              <MyProfile />
            </UserRoute>
          }
        />

        <Route path="/About" element={<About />} />

        <Route
          path="/Feedback"
          element={<Contact />}
        />

        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Route>

      <Route
        path="/admin-dashboard"
        element={
          <Navigate
            to="/admin/dashboard"
            replace
          />
        }
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
          element={
            <Navigate to="dashboard" replace />
          }
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

        <Route
          path="manage-orders"
          element={<ManageOrders />}
        />

        <Route
          path="manage-feedback"
          element={<ManageMessages />}
        />
      </Route>
    </Routes>
  );
}

export default App;
