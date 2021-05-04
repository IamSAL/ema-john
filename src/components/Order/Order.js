import React, { useEffect, useState } from 'react';
import Cart from '../Shop/Cart';
import { Link } from 'react-router-dom';
import { filterDuplicates } from './../../utilities/funcs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ShowNotification } from '../Auth/Snackbar';

const Order = ({ CartList, setCartList }) => {
    const [NotifyData, setNotifyData] = useState({ show: false, msg: "Snackbar", severity: "info" })
    const [NotifyShow, setNotifyShow] = useState(false)
    function Notify(msg, severity) {
        setNotifyData(previousData => {
            previousData.msg = msg;
            setNotifyShow(true)
            let id = setTimeout(() => {
                setNotifyShow(false)
            }, 3000)
            while (id--) {
                window.clearTimeout(id);
            }
            previousData.severity = severity;
            return previousData;
        })
    }

    const removeProduct = (e, prod) => {
        let updatedCart = CartList.filter(CartProduct => CartProduct.key !== prod.key)
        setCartList(updatedCart)
        Notify(`Removed ${prod.name.substring(0.60)}...`, "success")
    }
    const [productsCount, setproductsCount] = useState({})

    useEffect(() => {
        let productsCountTemp = {

        }
        CartList.forEach(product => {
            productsCountTemp[product.key] = (productsCountTemp[product.key] || 0) + 1;
        });

        setproductsCount(productsCountTemp)
        return () => {

        }
    }, [])




    const dataToShow = () => {
        if (CartList.length > 0) {
            return (
                <table>
                    <thead>



                        <tr style={{ textAlign: "center" }}>
                            <td>Product</td>
                            <td>Name</td>
                            <td>Unit Price</td>
                            <td>
                                Quantity
                            </td>
                            <td>
                                Total price
                            </td>
                            <td>
                                Action
                            </td>
                        </tr>

                    </thead>
                    <tbody>
                        {

                            filterDuplicates(CartList).map((prod, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>
                                            <img src={prod.img} alt="" />
                                        </td>

                                        <td title={prod.name}>
                                            <Link to={`/shop/${prod.key}`} > {(prod.name).substring(0, 40)}...</Link>
                                        </td>
                                        <td>
                                            ${prod.price}
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faTimes} />  {productsCount[prod.key]}
                                        </td>

                                        <td>
                                            ${(prod.price * productsCount[prod.key]).toFixed(2)}
                                        </td>
                                        <td>
                                            <button onClick={(e) => { removeProduct(e, prod) }}>Remove</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table >
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
            {NotifyShow && <ShowNotification msg={NotifyData.msg} severity={NotifyData.severity} autohide={3000}></ShowNotification>}
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
