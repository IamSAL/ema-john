
import React from 'react'
import './404.css'
import { Link } from 'react-router-dom'
export default function Notfound() {
    return (
        <div class="d-flex justify-content-center align-items-center" id="main">
            <h1 class="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>

            <div class="inline-block align-middle">
                <h2 class="font-weight-normal lead" id="desc">The page you requested was not found.</h2>
                <Link to="/shop"><button className="amznbtn">Go to shop</button></Link>
            </div>

        </div>

    )
}
