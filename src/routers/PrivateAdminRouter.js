import { notification } from "antd";
import React from "react";
import { Redirect, Route } from "react-router-dom";




function PrivateRouterAdmin({ component: Component,check:check, ...rest }) {
 
  console.log(check)
    const isLogin = localStorage.getItem('islogin')
  return (
    <>
    <Route
      {...rest}
      render={props =>{
        if(isLogin){
            if(check){
              return (<Component {...props} />)
            }
            else{
              notification["warning"]({
                message: "Thông báo",
                duration: 2,
                description: "Bạn không có quyền truy cập",
              });
              return  <Redirect to="/admin/"/>
            }
           
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