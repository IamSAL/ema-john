import React, { useState, useEffect, createContext } from 'react';
import Header from './components/Header';
import Shop from './components/Shop/Shop';
import fakeData from './fakeData';
import { Link } from 'react-router-dom';
import { useComponentWillMount } from './utilities/funcs';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Order from './components/Order/Order'
import SingleProduct from './components/Shop/SingleProduct';
import './App.css';
import { Inventory } from './components/Inventory/Inventory';
import Notfound from './components/404';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import { Profile } from './components/Auth/Profile';
export const AuthContext = createContext();

export const emptyUser = {
  isLoggedIn: false,
  username: "",
  email: "",
  photoURL: ""
}
function App() {

  const [CartList, setCartList] = useState([])
  const [Products, setProducts] = useState([])
  const [AuthInfo, setAuthInfo] = useState(emptyUser)


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

    <AuthContext.Provider value={[AuthInfo, setAuthInfo]}>
      <Router>

        <Header></Header>


        <Switch >


          <Route exact path='/'>
            <Shop Products={Products} CartList={CartList} setCartList={setCartList}></Shop>
          </Route>
          <Route exact path='/shop'>
            <Shop Products={Products} CartList={CartList} setCartList={setCartList}></Shop>
          </Route>
          <Route path='/shop/:productKey'>
            <SingleProduct Products={Products} setCartList={setCartList}></SingleProduct>
          </Route>
          <PrivateRoute path='/order' >
            <Order CartList={CartList} setCartList={setCartList}></Order>
          </PrivateRoute>

          <PrivateRoute path='/inventory'><Inventory features={{ Products, setProducts }}></Inventory></PrivateRoute>
          <PrivateRoute path='/profile'><Profile></Profile></PrivateRoute>
          <Route path="/account">
            <Login></Login>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>


      </Router>
    </AuthContext.Provider>

  );
}

export default App;
