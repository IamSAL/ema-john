import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

// import './Product.css'
const Product = ({ product, setCartList, widthClass }) => {
    // console.log(product)
    function getRatings(product) {
        let stars = [];
        let currStar = product.star;
        while (currStar) {
            stars.push(<FontAwesomeIcon style={{ color: "#ff9900" }} icon={faStar} />)
            currStar--;
        }
        return stars;
    }
    return (



        <div className={widthClass || "col-md-3"}>
            <figure className="card card-product-grid card-lg"> <Link to={`/shop/${product.key}`} className="img-wrap" data-abc="true"><img src={product.img} /> </Link>
                <figcaption className="info-wrap">
                    <div className="row">
                        <div className="col-md-12" title={product.name}> <Link to={`/shop/${product.key}`} className="title" data-abc="true">{product.name.substring(0, 50)}...</Link> </div>

                    </div>
                    <div className="row">
                        <div className="col-md-7">
                            <small className="text-success">By: {product.seller} | Stock: {product.stock} </small>
                        </div>
                        <div className="col-md-5">
                            <div className="rating text-right"> {getRatings(product)}</div>
                        </div>
                    </div>
                </figcaption>
                <div className="bottom-wrap"> <button className="btn  float-right amznbtn" data-abc="true" onClick={(e) => setCartList(Cart => [...Cart, product])}> Add to cart </button>
                    <span className="price h5">${product.price}</span> <br />
                </div>
            </figure>
        </div>

    )
}

export default Product
