import { Col, Drawer, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeToCart, updateToCart } from "../../../../redux/Action/cartAction";
import CartItem from "./cartItem";
import './index.css'

const Cart = ({ onClose, visible, cart, onDeletePrToCart,onUpdatePrToCart }) => {
 
  
  
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
  const onHandleRemoveCart = (product,topping) => {
    onDeletePrToCart(product,topping);
  };
  
  return (
    <>
      <Drawer
        title="Giỏ hàng"
        placement="right"
        width={400}
        onClose={onClose}
        visible={visible}
      >
        <Col span={24}>
          <Row className="row-show-cart" style={{ margin: 0 }}>
            <Col span={24}>
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
             
                {cart.length>0&&
                 <Row className="cart__button"><Link to="/checkout" className="btn__label">
                  Tiến hành đặt hàng
                </Link>
                </Row>
                }
             
            </Col>
          </Row>
         
        </Col>
      </Drawer>
    </>
  );
};
Cart.propTypes = {};
const mapStateToProps = (state) => {
  return {
    cart: state.cartData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onDeletePrToCart: (product,topping,) => {
      dispatch(removeToCart(product,topping));
    },
    onUpdatePrToCart :(product,quantity,topping,note)=>{
      dispatch(updateToCart(product,quantity,topping,note))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
