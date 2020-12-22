import { notification } from "antd";
import React from "react";
import { Redirect, Route } from "react-router-dom";




function PrivateRouterAdmin({ component: Component, ...rest }) {
 
  
    const isLogin = localStorage.getItem('islogin')


  return (
    <>
    <Route
      {...rest}
      render={props =>{
        if(isLogin){
           
            return (<Component {...props} />)
        }
        else{
            
           
            notification["warning"]({
                message: "Thông báo",
                duration: 2,
                description: "Bạn chưa đăng nhập",
              });
            return  <Redirect to="/admin/login"/>
        }
      }
      }
    />
 
      </>
     
  
    
    
  );
}

export default PrivateRouterAdmin;