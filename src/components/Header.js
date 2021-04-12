import React from 'react';
import './Header.css';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Header = () => {
    let location = useLocation() || window.location
    return (
        <React.Fragment>
            <div className="header">
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="nav">
                <ul><Link to="/shop"><li>Shop</li></Link>
                    <Link to="/order"><li>Order Review</li></Link>
                    <Link to="/inventory"><li>Manage Inventory</li></Link></ul>
            </div>
        </React.Fragment>
    )
}
export default Header;
