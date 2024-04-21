import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
// import "./assets/styles/bootstrap.custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/index.css";
import App from "./App";
import HomeScreen from "./screens/HomeScreen";
import SingleBookScreen from "./screens/SingleBookScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import StaffLoginScreen from "./screens/admin/StaffLoginScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoute from "./components/AdminRoute";
import OrdersScreen from "./screens/admin/OrdersScreen";
import ReadyOrders from "./screens/admin/ReadyOrders";
import ProductsScreen from "./screens/admin/ProductsScreen";
import EditBookScreen from "./screens/admin/EditBookScreen";
import StaffListScreen from "./screens/admin/StaffListScreen";
import EditStaffScreen from "./screens/admin/EditStaffScreen";
import StaffProfile from "./screens/admin/StaffProfile";
import Deliveries from "./screens/admin/Deliveries";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/admin" element={<StaffLoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/book/:id" element={<SingleBookScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/books" element={<ProductsScreen />} />
        <Route path="/orders" element={<OrdersScreen />} />
        <Route path="/readyorders" element={<ReadyOrders />} />
        <Route path="/books/:id/edit" element={<EditBookScreen />} />
        <Route path="/staff" element={<StaffListScreen />} />
        <Route path="/staff/:id/edit" element={<EditStaffScreen />} />
        <Route path="/staffprofile" element={<StaffProfile />} />
        <Route path="/mydeliveries" element={<Deliveries />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
