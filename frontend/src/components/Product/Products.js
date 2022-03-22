import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import { useParams } from "react-router-dom";

const Products = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams()
    const { products, loading, error, productsCount } = useSelector(state => state.product)
    useEffect(() => {
        dispatch(getProduct(keyword))
        console.log("keyword isss :", keyword)
    }, [dispatch, keyword])

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
            </Fragment>)}
    </Fragment>
};

export default Products;
