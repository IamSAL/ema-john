import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Shop from './components/Shop/Shop';
import fakeData from './fakeData';
import { Link } from 'react-router-dom';
import { useComponentWillMount } from './utilities/funcs';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Order from './components/Order/Order'
import SingleProduct from './components/Shop/SingleProduct';
import './App.css';
import { Inventory } from './components/Inventory/Inventory';
import Notfound from './components/404';
function App() {
  const [CartList, setCartList] = useState([])
  const [Products, setProducts] = useState([])

  useComponentWillMount(() => {
    setProducts(fakeData);
    if (localStorage.getItem("cart")) {
      setCartList(JSON.parse(localStorage.getItem("cart")))
    }

  }, [])
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(CartList))
    return () => {
    }
  }, [CartList])

  return (
    <Router>

      <Header></Header>
      <Switch>


        <Route exact path='/'>
          <Shop Products={Products} CartList={CartList} setCartList={setCartList}></Shop>
        </Route>
        <Route exact path='/shop'>
          <Shop Products={Products} CartList={CartList} setCartList={setCartList}></Shop>
        </Route>
        <Route path='/shop/:productKey'>
          <SingleProduct Products={Products} setCartList={setCartList}></SingleProduct>
        </Route>
        <Route path='/order' >
          <Order CartList={CartList} setCartList={setCartList}></Order>
        </Route>
        <Route path='/inventory' > <Inventory features={{ Products, setProducts }}></Inventory></Route>
        <Route path="*">
          <Notfound></Notfound>
        </Route>
      </Switch>


    </Router>
  );
}

export default App;
