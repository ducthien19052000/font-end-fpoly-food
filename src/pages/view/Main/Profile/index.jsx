import { Button, Col, Divider, Form, Input, Menu, Row } from "antd";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import "./index.css";
import * as userAction from "../../../../redux/Action/userAction";

const Profile = ({user,userAct}) => {
  const [form] = Form.useForm();
  const fetchEmployee = useCallback(() => {
    const { getData } = userAct;
   
    getData();
  }, [userAct]);
  useEffect(() => {
    fetchEmployee();
    
  }, [fetchEmployee]);

  form.setFieldsValue( user);
  const onFinish = (values) => {
    const data = {email:values.email,phone:values.phone,address:values.address}
    const {editDataUser} = userAct;
    editDataUser(data);
  };
  return (
    <div>
      <Row type="flex" className="user-info-container">
        <Col xs={24} md={22} xl={20} style={{ margin: "auto" }}>
          <Row className="rowProfile1">
            <Col xs={0} md={6} style={{ padding: "0 8px" }}>
              <Row>
                <Menu
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  mode="inline"
                >
                  <Menu.Item key="1" className="menuItemProfile">
                    <Link to='/profile'>
                      Thông tin cá nhân
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="2" className="menuItemProfile">
                    <Link to='/profile/order'>
                      Quản lý đơn hàng
                      </Link>

                  </Menu.Item>
                </Menu>
              </Row>
            </Col>
            <Col xs={24} md={18} style={{ padding: "0 8px" }}>
              <div className="cardProfileUser">
                <Row style={{ padding: "22px" }}>
                  <span className="spanTitleProfile">Thông tin cá nhân</span>
                </Row>
                <Divider />
                <Row className="user-profile">
                  <Col xs={24} md={24}>
                    <Form
                      layout={'vertical'}
                      form={form}
                      onFinish={onFinish}
                    >

                      <Col xs={24} md={16}>
                        <Form.Item label="Họ tên" name='name'>
                          <Input  disabled />
                        </Form.Item>
                        <Form.Item label="Email" name='email'>
                          <Input disabled />
                        </Form.Item>
                        <Form.Item label="Địa chỉ" name='address'>
                          <Input />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name='phone'>
                          <Input />
                        </Form.Item>
                        <Form.Item >
                          <Button type="primary" htmlType='submit'>Cập nhật</Button>
                        </Form.Item>
                        </Col>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

Profile.propTypes = {};
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

