import React from 'react'
import './Search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
const Search = ({ setSearchTerm, CartList }) => {
    return (
        <div className="searchbar">
            <input type="text" placeholder="Search products..." onChange={(e) => { setSearchTerm(e.target.value) }} />
            <span><FontAwesomeIcon icon={faShoppingCart} style={{ width: "unset" }}></FontAwesomeIcon> <span style={{ marginLeft: "5px" }}>{CartList.length}</span> </span>
        </div>
    )
}

export default Search
