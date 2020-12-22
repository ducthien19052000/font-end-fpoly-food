import {
  ShoppingCartOutlined
} from "@ant-design/icons";
import { Col, Row, Select } from "antd";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { API_BASE_URL } from "../../../../constants";
import { addToCart, removeToCart, updateToCart } from "../../../../redux/Action/cartAction";
import * as categoryAction from "../../../../redux/Action/categoryAction";
import * as foodAction from "../../../../redux/Action/index";
import CartItem from "../Cart/cartItem";
import "./index.css";
import ProductCategory from "./ProducCategory.jsx";

const { Option } = Select;

const Product = ({ foodAct, categoryAct, litsFoot, listGroup, onDeletePrToCart,cart,onUpdatePrToCart }) => {

  let history = useHistory()
  const [categoryHome,setCategoryHome]=useState([]);
  useEffect(()=>{
    fetch(API_BASE_URL+`/menu`, {
  "method": "GET",
  "headers": new Headers({
    'Content-Type' : 'application/json',
    'Accept': '*/*'
})
})
.then(response => response.json())
.then(response => {
    setCategoryHome(response.body.content)
})
.catch(err => { console.log(err); 
});
   
  },[])
  // const fetchCategory = useCallback(() => {
  //   const { getDataCategory } = categoryAct;
  //   getDataCategory();
  // }, [categoryAct]);
  // useEffect(() => {
  //   fetchCategory();
  // }, [fetchCategory]);
  const onHandleRemoveCart = (product) => {
    onDeletePrToCart(product);
  };
  const showTotal = (ct) => {
    var total = 0;
    if (ct.length > 0) {
      for (var i = 0; i < ct.length; i++) {
        total += ct[i].product.price * ct[i].quantity;
      }
      return total;
    }
  };
  const handleChange= (value)=>{
console.log(value)
  }
    const onSearch = (value) => history.push(`/search/${value}`);
  return (
    <>
      <Row className="container-main-product">
        <Col span={22} style={{ margin: "0 auto" }}>
          <Row className="content-food">
            <h2>Menu của nhà hàng</h2>
          </Row>
          <Row style={{ background: "#eeeeee" }}>
            <Col span={8}>
              <Row style={{ margin: "20px" }}>
                <Col span={18} push={6}>
                  <Select defaultValue="Menu" style={{ width: 120 }} onChange={handleChange}>
                    {listGroup.map((category, index) => (
                      <Option value={category.categoryName} key={index}>
                        <Link  to={`/category/${category.id}`}>{category.categoryName}</Link>
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={6} pull={18}>
                  Danh mục
                </Col>
              </Row>
            </Col>
            <Col span={8} offset={8}>
              <Row style={{ margin: "20px" }}>
                <Col span={16} offset={8}>
                  <Col>
                  <Search
                      placeholder="Tìm món ăn"
                      enterButton
                      onSearch={onSearch}
                    />
                  </Col>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={18} className="menu-food-col">
              {categoryHome.map((category, index) => (
                <ProductCategory category={category} key={index} />
              ))}
            </Col>
            <Col span={6}>
              <Row className="row-show-cart" style={{ margin: 0 }}>
                <Col span={24}>
                  <div
                    style={{
                      position: "absolute",
                      top: "-44px",
                      right: "0px",
                      backgroundColor: "rgb(235, 113, 0)",
                      borderRadius: "50px",
                      width: "80px",
                      height: "80px",
                      border: "12px solid white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ShoppingCartOutlined />
                  </div>
                  <Row className="cart__header">
                    <span>Số món</span>
                  </Row>
                  {cart.map((item, index) => (
                <CartItem item={item} key={index} onHandleRemoveCart={onHandleRemoveCart} onUpdatePrToCart={onUpdatePrToCart}/>
              ))}
                  <Row className="row-price-cart">
                    <span className="cart__price-total">Tổng giá</span>

                    <span className="cart__price-total" span={16}>
                        
                      {showTotal(cart)} đ
                    </span>
                  </Row>
                  <Row className="cart__button">
                  <Link to="/checkout" className="btn__label">
                  Tiến hành đặt hàng
                </Link>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  // console.log(state.foodData.lists)
  return {
    litsFoot: state.foodData.lists,
    listGroup: state.groupData.lists,
    cart: state.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    foodAct: bindActionCreators(foodAction, dispatch),
    categoryAct: bindActionCreators(categoryAction, dispatch),

    AddToCart: (product, quantity,topping,note) => {
      dispatch(addToCart(product, quantity,topping,note));
    },
    onDeletePrToCart:(product,topping)=>{
      dispatch(removeToCart(product,topping))
    },
    onUpdatePrToCart: (product, quantity, topping,note) => {
      dispatch(updateToCart(product, quantity, topping,note));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
