import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Cart = ({ CartList }) => {
    const location = useLocation();
    const TAX_PERCENT = 5;
    const SHIPPING_COST = 0.5;
    let data = {
        itemsOrdered: CartList.length,
        itemsPrice: CartList.reduce((acc = 0, curr) => acc + Number(curr.price), 0).toFixed(2),
        ShippingCost: 0,
        Tax: 0,
        Total: 0
    }
    data.ShippingCost = (data.itemsOrdered * SHIPPING_COST).toFixed(2);
    data.Tax = ((data.itemsPrice * TAX_PERCENT) / 100).toFixed(2);
    data.Total = (parseFloat(data.itemsPrice) + parseFloat(data.ShippingCost) + parseFloat(data.Tax)).toFixed(2)

    return (

        <div className="cart">
            <h3>Order Summary</h3>
            <div className="total-items">
                items Ordered: {data.itemsOrdered}
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>items: </td>
                        <td>${data.itemsPrice}</td>
                    </tr>
                    <tr>
                        <td>Shipping: </td>
                        <td>${data.ShippingCost}</td>
                    </tr>
                    <tr>
                        <td>Total before tax: </td>
                        <td>${(data.Total - data.Tax).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Estimated Tax: </td>
                        <td>${data.Tax}</td>
                    </tr>
                    <tr>
                        <td>Order Total: </td>
                        <td>${data.Total}</td>
                    </tr>
                </tbody>
            </table>
            {location.pathname !== '/order' && <Link to="/order">
                <button>
                    Review your order
            </button>
            </Link>}

        </div>
    )
}

export default Cart
