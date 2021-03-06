import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import Pagination from 'react-js-pagination'
import { Typography } from "@mui/material";
import { Slider } from "@mui/material/";
import { useAlert } from 'react-alert'

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];
const Products = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams() //this will take the keyword from the url
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const alert = useAlert();
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.product)
    let count = filteredProductsCount;
    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error])

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    return <Fragment>
        {loading ? <Loader />
            :
            (<Fragment>

                <MetaData title="Products -- HamzaCod3$" />
                <h2 className="productsHeading">Products</h2>
                <div className="products">
                    {products && products.map(product =>
                        <ProductCard key={product._id} product={product} />
                    )}
                </div>
                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    />
                    <Typography>Categories</Typography>
                    <ul className="categoryBox">
                        {categories.map((category) => (
                            <li
                                className="category-link"
                                key={category}
                                onClick={() => setCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider
                            value={ratings}
                            onChange={(e, newRating) => {
                                setRatings(newRating);
                            }}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                        />
                    </fieldset>
                </div>
                {resultPerPage < count && (
                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>
                )}
            </Fragment>)}
    </Fragment>
};

export default Products;
