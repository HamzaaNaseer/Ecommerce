import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import { useParams } from "react-router-dom";
import Pagination from 'react-js-pagination'

const Products = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams() //this will take the keyword from the url
    const [currentPage, setCurrentPage] = useState(1);
    const { products, loading, error, productsCount, resultPerPage } = useSelector(state => state.product)
    useEffect(() => {
        dispatch(getProduct(keyword, currentPage))
        console.log("result per page is :", resultPerPage, "and products count is : ", productsCount)
    }, [dispatch, keyword, currentPage])

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    return <Fragment>
        {loading ? <Loader />
            :
            (<Fragment>
                <h2 className="productsHeading">Products</h2>
                <div className="products">
                    {products && products.map(product =>
                        <ProductCard key={product._id} product={product} />
                    )}
                </div>
                {resultPerPage < productsCount && (
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
