import { Button, Col, Form, notification, Row } from "antd";
import confirm from "antd/lib/modal/confirm";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { deleteAllCart } from "../../../../redux/Action/cartAction";
import * as invoiceAction from "../../../../redux/Action/invoiceAction";
import CartCheckout from "../Cart/CartCheckout";

const FourStep = ({
  current,
  setCurrent,
  steps,
  invoiceAct,
  onDeletePrToCart,
}) => {
  const dataLocal = localStorage.getItem("OrderDetail");
  const history = useHistory();
  const orderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;
  const data = {
    fullName: orderDetail.user.name,
    cartRequests: orderDetail.cartRequests,
    deliveryAddress: orderDetail.user.deliveryAddress,
    buildingAddress:(orderDetail.user.building +' '+ orderDetail.user.floor+' phòng' + orderDetail.user.class),
    description: orderDetail.user.description,
    paymentMethods: orderDetail.paymentMethods,
    receivingTime:orderDetail.user.receivingTime,
    amountTotal: orderDetail.amountTotal,
    phone: orderDetail.user.phone,
    email: orderDetail.user.email,
  };
  const [visible, setVisible] = useState(false);
 
 
  const showDrawer = () => {

    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 22 },
  };
  const onFinish = (values) => {
    
  };
  const handleCheckout = (data) => {
    const { addData } = invoiceAct;
    const cart = [];
    console.log(data)
    confirm({
      title: "Bạn muốn đặt hàng?",
      content: "",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        addData(data);
        onDeletePrToCart(cart);
        history.push("/");
       
      },
      onCancel() {},
    });
  };
  const onFinishFailed = (errorInfo) => {
    
  };
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <>
      <Row className="row-checkout-profile-user" style={{ margin: 0 }}>
        <Form
          style={{ width: "100%", display: "contents" }}
          {...layout}
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Col xs={24} md={12} className="customer-info">
            <h1>Thông tin khách hàng</h1>
            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Họ và tên"
              name="name"
            >
              <p style={{ fontSize: "14px", fontWeight: 400 }}>
                {orderDetail.user.name}
              </p>
            </Form.Item>

            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Email"
              name="email"
            >
              <p style={{ fontSize: "14px", fontWeight: 400 }}>
                {orderDetail.user.email}
              </p>
            </Form.Item>

            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Số điện thoại"
              name="phone"
            >
              <p style={{ fontSize: "14px", fontWeight: 400 }}>
                {orderDetail.user.phone}
              </p>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} className="customerAddress">
            <h1>Thông tin đơn hàng</h1>
            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Món ăn"
              name="name"
            >
              <p style={{ fontSize: "14px", fontWeight: 400 }}>Số sản phẩm</p>
            </Form.Item>

            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Chi phí"
              name="email"
            >
              <p style={{ fontSize: "14px", fontWeight: 400 }}>
                {orderDetail.amountTotal} đ
              </p>
            </Form.Item>

            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Xem chi tiết đơn hàng"
              name="phone"
            >
              <Button type="primary"  onClick={showDrawer}>Chi tiết</Button>
            </Form.Item>
          </Col>

          <div className="steps-action">
            <Row>
              <Col xs={24} md={12}>
                {current > 0 && (
                  <div className="btnPre">
                    <Button style={{ margin: "0 8px" }} size='large' onClick={() => prev()}>
                      Quay lại
                    </Button>
                  </div>
                )}
              </Col>
              <Col xs={24} md={12}  style={{ textAlign: "end" }}>
                {current < steps.length - 1 && (
                  <Button type="primary" size='large' onClick={() => next()}>
                    Tiếp theo
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" size='large' onClick={() => handleCheckout(data)}>
                    Thanh toán
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        </Form>
        {visible === true ? (
                <CartCheckout visible={visible} onClose={onClose} />
              ) : (
                ""
              )}
      </Row>
    </>
  );
};

FourStep.propTypes = {};

const mapDispatchToProps = (dispatch) => {
  return {
    invoiceAct: bindActionCreators(invoiceAction, dispatch),
    onDeletePrToCart: (product) => {
      dispatch(deleteAllCart(product));
    },
  };
};

export default connect(null, mapDispatchToProps)(FourStep);
