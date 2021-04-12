import React from 'react';
import Cart from '../Shop/Cart';
import { Link } from 'react-router-dom';
const Order = ({ CartList, setCartList }) => {
    const removeProduct = (e, prod) => {
        let updatedCart = CartList.filter(CartProduct => CartProduct.key !== prod.key)
        setCartList(updatedCart)
    }
    let productsCount = {

    }
    CartList.forEach(product => {
        productsCount[product.key] = (productsCount[product.key] || 0) + 1;
    });

    console.log(productsCount)

    const dataToShow = () => {
        if (CartList.length > 0) {
            return (
                <table>
                    <tbody>
                        {

                            [...new Set(CartList)].map((prod, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>
                                            <img src={prod.img} alt="" />
                                        </td>

                                        <td>
                                            <Link to={`/shop/${prod.key}`} > {(prod.name).substring(0, 40)}...</Link>
                                        </td>
                                        <td>
                                            ${prod.price}
                                        </td>
                                        <td>
                                            X {productsCount[prod.key]}
                                        </td>

                                        <td>
                                            ${prod.price * productsCount[prod.key]}
                                        </td>
                                        <td>
                                            <button onClick={(e) => { removeProduct(e, prod) }}>Remove</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            )
        } else {
            return (
                <div className="Message">
                    <h3>
                        Your Cart is empty, <Link to="/shop">Go to shop</Link>
                    </h3>
                </div>
            )
        }
    }
    return (
        <div>
            <div className="main">

                <div className="products">
                    {
                        dataToShow()
                    }
                </div>

                <Cart CartList={CartList}></Cart>


            </div>

        </div>
    )
}

export default Order
