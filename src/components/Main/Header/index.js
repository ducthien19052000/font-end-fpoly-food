import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Dropdown, Image, Layout, Menu, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { GOOGLE_AUTH_URL } from "../../../constants";
import * as foodAction from "../../../redux/Action/categoryAction";
import * as userAction from '../../../redux/Action/userAction';
import "./index.css";

const Header = ({ listGroup, foodAct,userAct,user }) => {
  const a = localStorage.getItem("accessToken");
  const b = a ? true : false;

  

  let history = useHistory();
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem("authenticated");
  });
  console.log(user)
  const fetchUser = useCallback(() => {
    const { getData } = userAct;
    getData();
  }, []);
  useEffect(() => {
    fetchUser();
    
  }, [fetchUser]);

  const fetchEmployee = useCallback(() => {
    const { getDataCategory } = foodAct;
    getDataCategory();
  }, [foodAct]);
  const onHandleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authenticated");
    
    setAuthenticated(false);
    history.push('/')
  };
  const handleLogin = () => {
    setAuthenticated(true);
  };
  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const menu = (
    <Menu>
      {listGroup.map((category, index) => (
        <Menu.Item key={index}>
          <Link to={`/category/${category.id}`}>{category.categoryName}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
  const menuUser = (
    <Menu>
      <Menu.Item>
        <Link to='/profile'>
          Tài khoản
        </Link>
      </Menu.Item>
      <Menu.Item>
        <a onClick ={onHandleLogout}>
          Đăng xuất
        </a>
      </Menu.Item>
    </Menu>
  );
  const { Header } = Layout;

  return (
    <Header className="header-main">
      <Row>
        <Col span={5}>
          <div className="logo-main">
            <Image
              src="https://rawcdn.githack.com/0967517236/logo/1fc2347cddbcc19d3041ea14e01819c29e1646f7/logo.png"
              width={50}
            />
          </div>
        </Col>
        <Col span={14} >
          <Menu theme="dark" mode="horizontal" className="menu-main">
            <Menu.Item key="1">
              {" "}
              <Link to="/" style={{ color: "#ffffff" }}>
                {" "}
                Trang chủ
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Dropdown overlay={menu}>
                <Link
                  to="/product"
                  style={{ background: "none", border: "none", color: "#fff" }}
                >
                  Menu <DownOutlined />
                </Link>
              </Dropdown>
            </Menu.Item>
            <Menu.Item key="3" style={{ color: "#ffffff" }}>
            <Link to="/contact" style={{ color: "#ffffff" }}>
               
            Liên hệ
              </Link>
         
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={5}>
          <Row>
          
              {b ? (
           
                  < >
                    <Col span={3} style={{ textAlign: "end", paddingRight: "30px" }}>
              <SearchOutlined
                style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
                onClick={() => history.push(`/search/`)}
              />
            </Col>
            <Col span={21} >
                  <Dropdown overlay={menuUser}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                     <UserOutlined /> <span>
                     Chào {user.name}
                     </span>
                    </a>
                  </Dropdown></Col>
                  </>
                  
                
               
              ) : (
                <>
                 <Col span={18} style={{ textAlign: "end", paddingRight: "30px" }}>
              <SearchOutlined
                style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
                onClick={() => history.push(`/search/`)}
              />
            </Col>
            <Col span={6} ><a onClick={handleLogin} href={GOOGLE_AUTH_URL} style={{color:'#ffffff'}}>
                  Login
                </a></Col>
                </>
              )}
              
              {/* {a &&  <Button onClick={onHandleLogout}>Logout</Button>}
              {!a&&  <a href={GOOGLE_AUTH_URL} onClick={()=>console.log('a')}>Login</a>} */}
            
           
              
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

const mapStateToProps = (state) => {
  return {
    listGroup: state.groupData.lists,
    user: state.userData.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    foodAct: bindActionCreators(foodAction, dispatch),
    userAct: bindActionCreators(userAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
