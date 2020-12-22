import { ShoppingCartOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  addToCart,
  removeToCart,
  updateToCart,
} from "../../../../redux/Action/cartAction";
import CartItem from "../Cart/cartItem";

const SearchComponent = ({
  cart,

  onDeletePrToCart,
  onUpdatePrToCart,
}) => {
  let history = useHistory();
  const onHandleRemoveCart = (product) => {
    onDeletePrToCart(product);
  };
  const onSearch = (value) => history.push(`/search/${value}`);
  const showTotal = (ct) => {
    var total = 0;
    if (ct.length > 0) {
      for (var i = 0; i < ct.length; i++) {
        total += ct[i].product.price * ct[i].quantity;
      }
      return total;
    }
  };
  return (
    <>
      <Row className="container-main-product">
        <Col span={22} style={{ margin: "0 auto" }}>
          <Row className="content-food">
            <h2> Hãy nhập từ khóa</h2>
          </Row>
          <Row style={{ background: "#eeeeee" }}>
            <Col span={8}></Col>
            <Col xs={24} md={8}>
              <Row style={{ margin: "20px",textAlign:'center' }}>
                <span style={{width:'100%'}}>
                  {" "}
                  <Search
                    placeholder="Tìm món ăn"
                    enterButton
                    size="large"
                    onSearch={onSearch}
                    style={{ width: "90%" }}
                  />
                </span>
              </Row>
            </Col>
            <Col span={8}></Col>
          </Row>

          <Row>
            <Col span={18} className="menu-food-col"></Col>
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
                  <Row>
                    {cart.map((item, index) => (
                      <CartItem
                        item={item}
                        key={index}
                        onHandleRemoveCart={onHandleRemoveCart}
                        onUpdatePrToCart={onUpdatePrToCart}
                      />
                    ))}
                  </Row>
                  <Row className="row-price-cart">
                    <span className="cart__price-total">Tổng giá</span>

                    <span className="cart__price-total" span={16}>
                      {showTotal(cart)} đ
                    </span>
                  </Row>
                  {cart.length>0&&<Row className="cart__button">
                    <Link to="/checkout" className="btn__label">
                      Tiến hành đặt hàng
                    </Link>
                  </Row>}
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
  return {
    cart: state.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AddToCart: (product, quantity, topping) => {
      dispatch(addToCart(product, quantity, topping));
    },
    onDeletePrToCart: (product) => {
      dispatch(removeToCart(product));
    },
    onUpdatePrToCart: (product, quantity, topping) => {
      dispatch(updateToCart(product, quantity, topping));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
