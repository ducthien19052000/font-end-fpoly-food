import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,

  Route,
  Switch
} from "react-router-dom";
import Main from "../pages/layout/Main";
import MainAdmin from "../pages/layout/MainAdmin";
import CategoryAdmin from "../pages/view/Admin/Category/index.jsx";
import Dashboard from "../pages/view/Admin/Dashbroad";
import Food from "../pages/view/Admin/Food";
import Invoice from "../pages/view/Admin/Invoice";
import Login from "../pages/view/Admin/Login";
import MenuAdmin from '../pages/view/Admin/Menu/index';
import Statistics from "../pages/view/Admin/Statistics";
import Topping from "../pages/view/Admin/Topping";
import Checkout from "../pages/view/Main/Checkout";
import Contact from "../pages/view/Main/Contact";
import FoodDetail from "../pages/view/Main/FoodDetail";
import Home from "../pages/view/Main/Home";
import Product from "../pages/view/Main/Product";
import Category from "../pages/view/Main/ProductCategory";
import ProductSearch from "../pages/view/Main/ProductSearch";
import Profile from "../pages/view/Main/Profile";
import ProfileInvoice from "../pages/view/Main/Profile/ProfileInvoice";
import SearchComponent from "../pages/view/Main/Search/index";
import OAuth2RedirectHandler from "../pages/view/Main/User/OAuth2/OAuth2RedirectHandler";
import PrivateAdminRoute from "./PrivateAdminRouter";
import PrivateRoute from "./PrivateRouter";


const Routers = () => {
  const [checkRole,setCheckRole]=useState(false)
  const role=localStorage.getItem('role')
  useEffect(()=>{
    if(role==='ADMIN'){
      setCheckRole(true)
    }
  },[])
 
  
  return (
    <Router>
      <Switch>
        <Route path="/admin/login">
          <Login />
        </Route>
        <Route path="/admin/:path?/:path?" exact>
          <MainAdmin>
            <Switch>
              <PrivateAdminRoute path='/admin/' check={true} component={Dashboard} exact>
               
              </PrivateAdminRoute>
              <PrivateAdminRoute path="/admin/statistics" check={checkRole} component={Statistics} >
             
              </PrivateAdminRoute>
              <PrivateAdminRoute path='/admin/topping' check={checkRole} component={Topping}>

              </PrivateAdminRoute>
              <PrivateAdminRoute path="/admin/food" check={checkRole} component={Food} >
              </PrivateAdminRoute>

              <PrivateAdminRoute path="/admin/category" check={checkRole} component={CategoryAdmin}>
              </PrivateAdminRoute>
              <PrivateAdminRoute path="/admin/menu" check={checkRole} component={MenuAdmin} >
             
              </PrivateAdminRoute>
              <PrivateAdminRoute path="/admin/invoice" check={true} component={Invoice}>
              </PrivateAdminRoute>
            </Switch>
          </MainAdmin>
        </Route>
        <Route>
          <Main>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path='/contact'>
                <Contact/>
              </Route>
              <Route path="/product">
                <Product />
              </Route>
              <Route path="/food/:id">
                <FoodDetail />
              </Route>
              <PrivateRoute path="/profile" component={Profile} exact></PrivateRoute>
              <PrivateRoute
                path="/checkout"
                component={Checkout}
              ></PrivateRoute>
              <PrivateRoute
                path="/profile/order"
                component={ProfileInvoice}
              ></PrivateRoute>

              <Route path="/category/:id">
                <Category />
              </Route>
              <Route path="/search/" exact>
                <SearchComponent />
              </Route>
              <Route path="/search/:key">
                <ProductSearch />
              </Route>
              <Route
                path="/oauth2/redirect"
                component={OAuth2RedirectHandler}
              ></Route>
            </Switch>
          </Main>
        </Route>
        
      </Switch>
    </Router>
  );
};

export default Routers;
