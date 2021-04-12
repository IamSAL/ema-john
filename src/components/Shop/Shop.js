import React, { useState, useEffect } from 'react'
import Search from './Search'
import Product from './Product'
import Cart from './Cart'

const Shop = ({ Products, CartList, setCartList }) => {
    const [Pages, setPages] = useState([]);
    const [PerPage, setPerPage] = useState(10)
    const [SearchTerm, setSearchTerm] = useState("")
    const [matchedProducts, setmatchedProducts] = useState([])
    const [CurrentProducts, setCurrentProducts] = useState(Products.slice(0, 10))
    function makePages(list, perPage = 20) {
        let pages = []
        let tempList = [...list]
        let i = 0;
        while (tempList.length > 0) {

            pages.push({ data: tempList.splice(0, perPage), sl: i++, isActive: i === 1 ? true : false });
        }
        return pages;
    }

    useEffect(() => {
        let pages = makePages(Products, PerPage)
        setPages(pages)
        return () => {
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {

        let pages;

        if (SearchTerm.length > 1 && matchedProducts.length) {
            pages = makePages(matchedProducts, PerPage)
        } else {
            pages = makePages(Products, PerPage)
        }
        setPages(pages)
        setCurrentProducts(pages[0].data)
        return () => {
        }
    }, [PerPage])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setmatchedProducts(Products.filter(product => JSON.stringify(product).includes(SearchTerm)));

        if (SearchTerm) {
            if (matchedProducts.length) {
                let pages = makePages(matchedProducts, PerPage)
                console.log(pages)
                setPages(pages)
                setCurrentProducts(pages[0].data)

            } else {
                console.log('nothing found')
            }

        } else {
            let pages = makePages(Products, PerPage)
            setPages(pages)
            setCurrentProducts(pages[0].data)
        }
        return () => {

        }
    }, [SearchTerm])// eslint-disable-line react-hooks/exhaustive-deps

    function handlePageClick(e, page) {
        setCurrentProducts(Pages[page.sl].data);
        setPages(Pages => Pages.map(newPage => Object.assign(newPage, newPage.sl === page.sl ? { isActive: true } : { isActive: false })))
    }

    return (
        <div>
            <Search setSearchTerm={setSearchTerm} CartList={CartList}></Search>

            <div className="main">

                <div className="products">
                    <div className="optionss">
                        <div className="d-flex flex-row">
                            <div className="text-muted m-2" id="res"> {
                                <span >Showing {matchedProducts.length} Products</span>
                            }</div>
                            <div className="ml-auto mr-lg-4" style={{ display: "flex" }}>
                                <div className="sorting" className="border rounded p-1 m-1"> <span className="text-muted">Sort by</span> <select name="" id="sort" onChange={(e) => { setPerPage(Number(e.target.value)); }}>
                                    <option value="7">Show Per page</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select></div>

                            </div>
                        </div>
                        <div>

                        </div>





                    </div>

                    <div className="container">
                        <div className="row">
                            {
                                CurrentProducts.map(prod => <Product product={prod} key={prod.key} widthClass={"col-md-4"} setCartList={setCartList}></Product>)
                            }
                        </div>
                    </div>
                    {
                        Pages.length > 1 && <div className="pagination">
                            {
                                Pages.map((page) => {

                                    return <span key={page.sl} className={page.isActive ? "active" : ""} onClick={(e) => { handlePageClick(e, page) }}>{page.sl + 1}</span>
                                })
                            }

                        </div>
                    }
                </div>
                <div className="cart">
                    <Cart CartList={CartList}></Cart>
                </div>

            </div>


        </div>


    )
}

export default Shop
