import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/user/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
