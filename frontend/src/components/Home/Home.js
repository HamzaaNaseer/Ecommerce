import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert"; //for showing alerts

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(getProduct());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="home page is working" />
          <div className="banner">
            <p>welcome to ecommerce</p>
            <h1>find amazing products below</h1>
            <a href="#container">
              <button>
                {/* CgMouse is a React Icon */}
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">featured products</h2>
          <div className="container" id="container">
            {products &&
              products.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
