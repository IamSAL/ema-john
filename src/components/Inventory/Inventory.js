import React, { useState } from 'react'
import './Inventory.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link, useRouteMatch, Switch, Route, useLocation, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import EnhancedTable from './InventoryTable';
import Product from '../Shop/Product'
export const Inventory = (props) => {

    const [count, setcount] = useState(6)
    const location = useLocation();
    const { Products, setProducts } = props.features;

    let match = useRouteMatch();
    return (
        <>
            {/* Navbar section */}

            <div className="filter"> <button className="btn btn-default" type="button" data-toggle="collapse" data-target="#mobile-filter" aria-expanded="true" aria-controls="mobile-filter">Filters<span className="fa fa-filter pl-1" /></button>
            </div>
            <div id="mobile-filter">
                <p className="pl-sm-0 pl-2">Product Inventory</p>
                <div className="border-bottom pb-2 ml-2">
                    <h4 id="burgundy">Filters</h4>
                </div>
                <div className="py-2 border-bottom ml-3">

                    <h6 className="font-weight-bold">Categories</h6>
                    <div className="orange"><FontAwesomeIcon icon={faMinus} style={{ width: "unset" }}></FontAwesomeIcon></div>
                    <form>
                        <div className="form-group"> <input type="checkbox" id="artisan" /> <label htmlFor="artisan">Fresh Artisan Breads</label> </div>
                        <div className="form-group"> <input type="checkbox" id="breakfast" /> <label htmlFor="breakfast">Breakfast Breads</label> </div>
                        <div className="form-group"> <input type="checkbox" id="healthy" /> <label htmlFor="healthy">Healthy Breads</label> </div>
                    </form>
                </div>
                <div className="py-2 border-bottom ml-3">
                    <h6 className="font-weight-bold">Accompainments</h6>
                    <div ><FontAwesomeIcon icon={faMinus} style={{ width: "unset" }}></FontAwesomeIcon></div>
                    <form>
                        <div className="form-group"> <input type="checkbox" id="tea" /> <label htmlFor="tea">Tea Cakes</label> </div>
                        <div className="form-group"> <input type="checkbox" id="cookies" /> <label htmlFor="cookies">Cookies</label> </div>
                        <div className="form-group"> <input type="checkbox" id="pastries" /> <label htmlFor="pastries">Pastries</label> </div>
                        <div className="form-group"> <input type="checkbox" id="dough" /> <label htmlFor="dough">Cookie Dough</label> </div>
                        <div className="form-group"> <input type="checkbox" id="choco" /> <label htmlFor="choco">Chocolates</label> </div>
                    </form>
                </div>
                <div className="py-2 ml-3">
                    <h6 className="font-weight-bold">Top Offers</h6>
                    <div className="orange"><FontAwesomeIcon icon={faMinus} style={{ width: "unset" }}></FontAwesomeIcon></div>
                    <form>
                        <div className="form-group"> <input type="checkbox" id="25off" /> <label htmlFor={25}>25% off</label> </div>
                        <div className="form-group"> <input type="checkbox" id="5off" /> <label htmlFor="5off" id="off">5% off on artisan breads</label> </div>
                    </form>
                </div>
            </div>
            {/* Sidebar filter section */}
            <section id="sidebar">
                <p> Product Inventory</p>
                <div className="border-bottom pb-2 ml-2">
                    <h4 id="burgundy">Filters</h4>
                </div>
                <div>
                    <input type="text" id="search" className="bg-light" placeholder="Filter..." />
                </div>
                <div className="py-2 border-bottom ml-3">
                    <h6 className="font-weight-bold">Categories</h6>
                    <div className="orange"><FontAwesomeIcon icon={faMinus} style={{ width: "unset" }}></FontAwesomeIcon></div>
                    <form>
                        <div className="form-group"> <input type="checkbox" id="artisan" /> <label htmlFor="artisan">Fresh Artisan Breads</label> </div>
                        <div className="form-group"> <input type="checkbox" id="breakfast" /> <label htmlFor="breakfast">Breakfast Breads</label> </div>
                        <div className="form-group"> <input type="checkbox" id="healthy" /> <label htmlFor="healthy">Healthy Breads</label> </div>
                    </form>
                </div>
                <div className="py-2 border-bottom ml-3">
                    <h6 className="font-weight-bold">Accompainments</h6>
                    <div className="orange"><FontAwesomeIcon icon={faMinus} style={{ width: "unset" }}></FontAwesomeIcon></div>
                    <form>
                        <div className="form-group"> <input type="checkbox" id="tea" /> <label htmlFor="tea">Tea Cakes</label> </div>
                        <div className="form-group"> <input type="checkbox" id="cookies" /> <label htmlFor="cookies">Cookies</label> </div>
                        <div className="form-group"> <input type="checkbox" id="pastries" /> <label htmlFor="pastries">Pastries</label> </div>
                        <div className="form-group"> <input type="checkbox" id="dough" /> <label htmlFor="dough">Cookie Dough</label> </div>
                        <div className="form-group"> <input type="checkbox" id="choco" /> <label htmlFor="choco">Chocolates</label> </div>
                    </form>
                </div>
                <div className="py-2 ml-3">
                    <h6 className="font-weight-bold">Top Offers</h6>
                    <div className="orange"><FontAwesomeIcon icon={faMinus} style={{ width: "unset" }}></FontAwesomeIcon></div>
                    <form>
                        <div className="form-group"> <input type="checkbox" id="25off" /> <label htmlFor={25}>25% off</label> </div>
                        <div className="form-group"> <input type="checkbox" id="5off" /> <label htmlFor="5off" id="off">5% off on artisan breads</label> </div>
                    </form>
                </div>
            </section>
            {/* products section */}
            <section id="products">
                <div className="container">
                    <div className="d-flex flex-row">
                        <div className="text-muted m-2" id="res">Showing {Products.length} results</div>
                        <div className="ml-auto mr-lg-4" style={{ display: "flex" }}>

                            <div className="sorting" className="border rounded p-1 m-1"> <span><Link to={`${match.url}/table`}>Table</Link></span>  </div>
                            <div className="sorting" className="border rounded p-1 m-1"> <span><Link to={`${match.url}/details`}>Full</Link></span>  </div>


                            {
                                location.pathname == `${match.url}/details` && <div className="sorting" className="border rounded p-1 m-1"> <span className="text-muted">Sort by</span> <select name="sort" id="sort">
                                    <option value="popularity">Popularity</option>
                                    <option value="prcie">Price</option>
                                    <option value="rating">Rating</option>
                                </select> </div>
                            }
                        </div>
                    </div>


                    {/* Products */}
                    <TransitionGroup>
                        <CSSTransition
                            key={location.key}
                            classNames="page"
                            timeout={300}
                        >
                            <Switch location={location}>

                                <Route path={`${match.path}/details`}>
                                    <div className="page">
                                        <div className="row ">

                                            {Products.length && Products.slice(0, count).map(product => <div key={product.key} className="col-lg-4 col-md-6 col-sm-10 offset-md-0 offset-sm-1">
                                                <div className="card mb-4"> <img className="card-img-top w-80" src={product.img} />
                                                    <div className="card-body">
                                                        <h5 title={product.name}><b>{product.name.substring(0, 30)}...</b> </h5>
                                                        <div className="d-flex flex-row my-2 ">
                                                            <div className="text-muted">$ {product.price}</div>
                                                            <div className="text-muted"> Stock: {product.stock}</div>
                                                            <div className="ml-auto"> <button className="border rounded bg-white sign"><FontAwesomeIcon icon={faPlus} className="orange" style={{ width: "unset" }}></FontAwesomeIcon></button> <span className="px-sm-1">1 loaf</span> <button className="border rounded bg-white sign"><FontAwesomeIcon icon={faMinus} className="orange" style={{ width: "unset" }}></FontAwesomeIcon></button> </div>
                                                        </div> <Link to={`/shop/${product.key}`}><button className="btn w-100 rounded my-2 amznbtn">View Details</button></Link>
                                                    </div>
                                                </div>
                                            </div>)}

                                        </div>
                                        {location.pathname == `${match.url}/details` && <div className="d-flex justify-content-center">
                                            {
                                                count < Products.length && <button className="btn w-25 rounded my-2 " onClick={() => setcount(count + 9)}>Load More...</button>
                                            }
                                        </div>}

                                    </div>

                                </Route>
                                <Route path={`${match.path}/table`}>

                                    <div className="row page">
                                        <EnhancedTable Products={Products} setProducts={setProducts}></EnhancedTable>
                                    </div>
                                </Route>
                                <Route path={`${match.path}/`}>
                                    <Redirect to={`${match.path}/table`}></Redirect>
                                </Route>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </section>
        </>

    )
}
