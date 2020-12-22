import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userAction from "../../../../redux/Action/userAction";

const FirstStep = ({ user, userAct, current, setCurrent, steps }) => {
  const dataLocal = localStorage.getItem("OrderDetail");
  const orderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;
  
    
  
  // orderDetail.user = user
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 22 },
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    orderDetail.user = values.user;
    localStorage.setItem("OrderDetail", JSON.stringify(orderDetail));
    next();
  };
console.log(user)
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const fetchEmployee = useCallback(() => {
    const { getData } = userAct;
   
    getData();
  }, [userAct]);
  useEffect(() => {
    fetchEmployee();
    
  }, [fetchEmployee]);

  form.setFieldsValue({ user: user});
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
          form={form}
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
              name={["user", "name"]}
              
            >
              <Input className="input-checkout" span={24}  disabled/>
            </Form.Item>

            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Email"
              name={["user", "email"]}
           
            >
              <Input className="input-checkout"  disabled/>
            </Form.Item>

            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Số điện thoại"
              name={["user", "phone"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại của bạn!",
                },
              ]}
            >
              <Input className="input-checkout" />
            </Form.Item>
            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Thời gian nhận hàng"
              name={["user", "receivingTime"]}
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input className="input-checkout" type='time' />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} className="customerAddress">
            <h1>Địa chỉ giao hàng</h1>
            <Row>
            <Col span={12}>
            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Tòa nhà"
              name={["user", "building"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại của bạn!",
                },
              ]}
            >
              <Select>
                <Select.Option value="Tòa F">Tòa F</Select.Option>
                <Select.Option value="Tòa P">Tòa P</Select.Option>
                <Select.Option value="Tòa T">Tòa T</Select.Option>
              </Select>
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Tầng"
              name={["user", "floor"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại của bạn!",
                },
              ]}
            >
              <Select>
                <Select.Option value="Tầng 1">Tầng 1</Select.Option>
                <Select.Option value="Tàng 2">Tầng 2</Select.Option>
                <Select.Option value="Tầng 3">Tầng 3</Select.Option>
                <Select.Option value="Tầng 4">Tầng 4</Select.Option>
              </Select>
            </Form.Item>
            </Col>
            </Row>

            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Phòng"
              name={["user", "class"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại của bạn!",
                },
              ]}
            
            >
              <Select>
                <Select.Option value="1"> 1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="6">6</Select.Option>
                <Select.Option value="7">7</Select.Option>
                <Select.Option value="8">8</Select.Option>
                <Select.Option value="9">9</Select.Option>
                <Select.Option value="10">10</Select.Option>
              
              </Select>
            </Form.Item>

            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Địa chỉ cụ thể"
              name={["user", "deliveryAddress"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại của bạn!",
                },
              ]}
            >
              <Input className="input-checkout" />
            </Form.Item>
            <Form.Item
              className="item-form"
              style={{ margin: 0 }}
              label="Ghi chú"
              name={["user", "description"]}
            >
              <Input className="input-checkout" />
            </Form.Item>
          </Col>

          <div className="steps-action">
            {current < steps.length - 1 && (
              <div className='btnNext'>
                <Button type="primary" htmlType="submit" size='large'  >
                Tiếp theo
              </Button>
              </div>
            )}
            {current === steps.length - 1 && (
              <Button size='large'
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
        </Form>
      </Row>
    </>
  );
};

FirstStep.propTypes = {};

const mapStateToProps = (state) => {
  return {
    user: state.userData.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userAct: bindActionCreators(userAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstStep);
