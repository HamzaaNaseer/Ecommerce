import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const ProductCard = ({ product }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: 'tomato',
        value: product.ratings,
        size: window.innerWidth < 600 ? 10 : 12,
        isHalf: true,
    }

    return <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt="product" />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options} /> <span className="ratings">({product.numOfReviews} reviews)</span>
        </div>
        <div className="price">{product.price}</div>
    </Link>;
};

export default ProductCard;
