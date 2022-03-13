import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";

const Home = () => {
    const product = {
        name: "blue Tshirt",
        price: "400$",
        _id: "hamza",
        images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    };
    return (
        <Fragment>
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
                <Product product={product} />
            </div>
        </Fragment>
    );
};

export default Home;
