import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header.js";
import UserOptions from "./components/layout/Header/UserOptions.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import Profile from "./components/user/Profile.js";
import LoginSignUp from "./components/user/LoginSignUp";
import UpdateProfile from "./components/user/UpdateProfile.js";
import UpdatePassword from "./components/user/UpdatePassword.js";
import ForgotPassword from "./components/user/ForgotPassword.js";
import ResetPassword from "./components/user/ResetPassword.js";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping.js";
import ConfirmOrder from "./components/cart/ConfirmOrder.js";
import Payment from "./components/cart/Payment.js";

import ProtectedRoute from "./components/Route/ProtectedRoute";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import axios from "axios";
//importing below 2 because of using stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("api/v1/stripeapikey");
    setStripeApiKey(data);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Router>
      <Header />
      {/* if user is login then only the below UserOptions will get displayed */}
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        {/* {isAuthenticated && (
          <Route exact path="/account" element={<Profile />} />
        )}
        {isAuthenticated && (
          <Route exact path="/me/update" element={<UpdateProfile />} />
        )} */}

        <Route exact path="/account" element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />} />
        </Route>

        <Route exact path="/me/update" element={<ProtectedRoute />}>
          <Route exact path="/me/update" element={<UpdateProfile />} />
        </Route>

        <Route exact path="/password/update" element={<ProtectedRoute />}>
          <Route exact path="/password/update" element={<UpdatePassword />} />
        </Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />

        <Route exact path="/shipping" element={<ProtectedRoute />}>
          <Route exact path="/shipping" element={<Shipping />} />
        </Route>

        <Route exact path="/order/confirm" element={<ProtectedRoute />}>
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        </Route>

        <Route exact path="/process/payment" element={<ProtectedRoute />}>
          <Route exact path="/process/payment" element={<Payment />} />
        </Route>

        {/* {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Route exact path="/process/payment" element={<ProtectedRoute />}>
              <Route exact path="/process/payment" element={<Payment />} />
            </Route>{" "}
          </Elements>
        )} */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
