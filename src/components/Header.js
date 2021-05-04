import React from 'react';
import './Header.scss';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, emptyUser } from './../App';
import { signOut } from './Auth/AuthProvider';

const Header = () => {
    const [AuthInfo, setAuthInfo] = useContext(AuthContext);
    let location = useLocation() || window.location
    function Logout() {

        signOut().then(res => {
            if (res) {
                setAuthInfo(emptyUser)
            }
        })
            .catch(err => console.log(err))
    }
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

                <ul className="auth">
                    {AuthInfo.isLoggedIn && <Link to="/profile"><li><img className="userimg" src={AuthInfo.photoURL} alt=""></img> {AuthInfo.username}</li></Link>}
                    {!AuthInfo.isLoggedIn ? <Link to="/account"><li>Login</li></Link> : <li onClick={(e) => Logout()} > Logout</li>}
                </ul>
            </div>

        </React.Fragment >
    )
}
export default Header;
