import { CreditCardFilled, DeleteTwoTone, DollarCircleFilled, EditTwoTone } from "@ant-design/icons";
import { Button, Col, message, notification, Row, Tabs } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { removeToCart, updateToCart } from "../../../../redux/Action/cartAction";
import EditCart from "../Cart/editCart";

const { TabPane } = Tabs;
const SecondStep = ({ cart, current, setCurrent, steps, onDeletePrToCart,onUpdatePrToCart }) => {
  const [isModal, setIsModal] = useState(false)
  const [itemEdit,setItemEdit] = useState({})

  const dataLocal = localStorage.getItem("OrderDetail");
  const orderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;
  const cartRequests = cart.map((item,index)=>{return {
    productId : item.product.id,
    quantity: item.quantity,
    listToppingId:item.topping.map(item=>item.topping.id)
  }})

  const onHandleRemoveCart = (product,topping) => {
    onDeletePrToCart(product,topping);
  };
  
  
  const handleCancel = (e) => {
    setIsModal(false);
  };
  const showModal = (item) => {
    setIsModal(true);
    setItemEdit(item)
  };
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

  const next = () => {
   if(cart.length>0){
    orderDetail.amountTotal = showTotal(cart);
    orderDetail.cartRequests= cartRequests
    orderDetail.paymentMethods = 'Thanh toán tiền mặt';
    setCurrent(current + 1);
    localStorage.setItem("OrderDetail", JSON.stringify(orderDetail));
   }
   else{
    notification['warning']({
      message: 'Cảnh báo',
      description:
        'Giỏ hàng rỗng, hãy thêm giỏ hàng để tiếp tục.',
    });
   }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <Row className="row-checkout-profile-user" style={{ margin: 0 }}>
        <Col xs={24} lg={17}>
          <div className="col-checkout-cart">
            <Row type="flex" className="checkoutCartHeader">
              <Col md={4} className="itemHeader"></Col>
              <Col md={5} className="itemHeader">
                <span className="nameItemHeaderCheckout">Tên món ăn</span>
              </Col>
              <Col md={4} className="itemHeader">
                <span className="nameItemHeaderCheckout">Giá</span>
              </Col>
              <Col md={4} className="itemHeader">
                <span className="nameItemHeaderCheckout">Số lượng</span>
              </Col>
              <Col md={4} className="itemHeader">
                <span className="nameItemHeaderCheckout">Thành tiền</span>
              </Col>
              <Col md={3} className="itemHeader">
                <span className="nameItemHeaderCheckout"></span>
              </Col>
            </Row>
            <Row className="bodyCheckoutCart">
              {cart.map((item, index) => (
                <Row className="overItem" key={index}>
                  <Col md={4} className="itemBody">
                    <img src={item.product.image} style={{ width: "96px" }} />
                  </Col>
                  <Col md={5} className="itemBody">
                    <span className="spanItemCartBody">
                      {item.product.productName}
                    </span>
                  </Col>
                  <Col md={4} className="itemBody">
                    <span className="spanItemCartBody">
                      {" "}
                      {item.product.price} đ{" "}
                    </span>
                  </Col>
                  <Col md={4} className="itemBody">
                    <span className="spanItemCartBody">{item.quantity}</span>
                  </Col>
                  <Col md={4} className="itemBody">
                    <span className="spanItemCartBody">
                      {item.product.price * item.quantity} đ
                    </span>
                  </Col>
                  <Col md={3} className="itemBody">
                    <span className="spanItemCartBody">
                      <Button style={{ background: "none", border: "none" }}  onClick={()=>showModal(item)}>
                        {" "}
                        <EditTwoTone />
                      </Button>
                      <Button
                        onClick={() => onDeletePrToCart(item.product,item.topping)}
                        style={{ background: "none", border: "none" }}
                      >
                        {" "}
                        <DeleteTwoTone />
                      </Button>
                    </span>
                  </Col>
                </Row>
              ))}
            </Row>
          </div>
        </Col>
        <Col xs={24} md={7} style={{ background: "#fff" }}>
          <div className="col-method-checkout">
            <Row type="flex" className="checkoutCartHeader">
              <Col span={24} className="itemHeader">
                <span className="nameItemHeaderCheckout">
                  Phương thức thanh toán
                </span>
              </Col>
            </Row>
            <Row className="">
              <Row>
                <Col md={24} className="itemBody">
                  <Tabs type="card">
                    <TabPane
                      tab={
                        <span>
                          <CreditCardFilled />
                          Chuyển khoản
                        </span>
                      }
                      key="1"
                    >
                      Đang phát triển
                    </TabPane>
                    <TabPane tab={
                        <span>
                          <DollarCircleFilled />
                          Tiền mặt
                        </span>
                      } key="2">
                        {current < steps.length - 1 && (
          <Button  size='large' type="primary" onClick={() => next()}>
            Xác nhận thanh toán
          </Button>
        )}
                    </TabPane>
                    
                  </Tabs>
                </Col>
              </Row>
            </Row>
          </div>

          <Row></Row>
        </Col>

        <Row className="subTotalCheckout">
          <Col xs={24} lg={12} style={{ textAlign: "left" }}>
            {" "}
            <span style={{ fontSize: "18px", fontWeight: "500" }}>
              Tổng chi phí
            </span>
          </Col>
          <Col xs={24} lg={12} style={{ textAlign: "right" }}>
            <span style={{ fontSize: "18px", fontWeight: "500" }}>
              {" "}
              {showTotal(cart)} VNĐ
            </span>
          </Col>
        </Row>
      </Row>
      <div className="steps-action">
        
        {current === steps.length - 1 && (
          <Button
          size='large'
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Thanh toán
          </Button>
        )}
        {current > 0 && (
         <div className='btnPre'>
         <Button style={{ margin: "0 8px" }} size='large' onClick={() => prev()}>
         Quay lại
       </Button>
       </div>
        )}
      </div>
      {isModal?<EditCart visible={isModal} handleCancel={handleCancel} onUpdatePrToCart={onUpdatePrToCart} onHandleRemoveCart={onHandleRemoveCart} item={itemEdit}/>:''}
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
    onDeletePrToCart: (product,topping) => {
      dispatch(removeToCart(product,topping));
    },
    onUpdatePrToCart :(product,quantity,topping)=>{
      dispatch(updateToCart(product,quantity,topping))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondStep);
