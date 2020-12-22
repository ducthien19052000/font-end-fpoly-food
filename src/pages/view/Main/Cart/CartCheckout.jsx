import { Col, Drawer, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import {
    removeToCart,
    updateToCart
} from "../../../../redux/Action/cartAction";
import CartItem from "./cartItem";
import "./index.css";

const CartCheckout = ({
  onClose,
  visible,
  cart,
  onDeletePrToCart,
  onUpdatePrToCart,
}) => {
  ///showTotalPrice
  const showTotal = (ct) => {
    var total = 0;
    if (ct.length > 0) {
      for (var i = 0; i < ct.length; i++) {
        total += ct[i].product.price * ct[i].quantity;
      }
      return total;
    }
  };

  //deleteCart
  const onHandleRemoveCart = (product, topping) => {
    onDeletePrToCart(product, topping);
  };
  const showQuantity = (cart) => {
    var quantity = 0;
    if (cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        quantity += Number(cart[i].quantity);
      }
      return quantity;
    }
  };

  return (
    <>
      <Drawer
        title="Chi tiết đơn hàng"
        placement="right"
        width={400}
        onClose={onClose}
        visible={visible}
      >
        <Col span={24}>
          <Row className="row-show-cart" style={{ margin: 0 }}>
            <Col span={24}>
              <Row className="cart__header">
                <span style={{fontWeight:400,fontSize:'2rem'}}>{showQuantity(cart)} món</span>
              </Row>
              {cart.map((item, index) => (
                <CartItem
                  item={item}
                  key={index}
                  onHandleRemoveCart={onHandleRemoveCart}
                  onUpdatePrToCart={onUpdatePrToCart}
                />
              ))}
              <Row className="row-price-cart">
                <span className="cart__price-total">Tổng chi phí</span>

                <span className="cart__price-total" span={16}>
                  {showTotal(cart)} đ
                </span>
              </Row>
            </Col>
          </Row>
        </Col>
      </Drawer>
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
    onDeletePrToCart: (product, topping) => {
      dispatch(removeToCart(product, topping));
    },
    onUpdatePrToCart: (product, quantity, topping) => {
      dispatch(updateToCart(product, quantity, topping));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartCheckout);
