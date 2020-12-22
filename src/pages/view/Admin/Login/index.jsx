import { Button, Carousel, Col, Divider, Form, Input, notification, Row, Spin } from "antd";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as loginAction from '../../../../redux/Action/loginAction';
import { login } from '../../../../untils/APIUtils';
import "./index.css";


const Login = ({ loginAct, isLogin }) => {
  // const islogin = localStorage.getItem('islogin');
  const history = useHistory()
  const onFinish = (values) => {
    const data ={email:values.email,password:values.password}
    login(data)
        .then(response => {
          console.log(response)
            localStorage.setItem('islogin', response.accessToken);
           alert('Đăng nhập thành công')
           history.push('/admin/')
        }).catch(error => {
          notification['error']({
            message: 'Thông báo',
            description:
              'Kiểm tra lại user và passwork',
          });
        })
    // login({ email: values.username, password: values.password })
    // console.log()
  };
  



  return (
    <>
      <Row className='container-Login'>
        <Col xs={0} md={8}>
          <Carousel className='slide-login' autoplay effect="scrollx">
            <div>
              <h3 className='contentStyle '>1</h3>
            </div>
            <div>
              <h3 className='contentStyle '>2</h3>
            </div>
            <div>
              <h3 className='contentStyle '>3</h3>
            </div>

          </Carousel>
        </Col>
        <Col xs={24} md={16} className='col-formLogin'>
          <Col xs={24} md={18} style={{ padding: '20px' }}>
            <div className='logo' style={{backgroundImage:`url("https://rawcdn.githack.com/0967517236/logo/1fc2347cddbcc19d3041ea14e01819c29e1646f7/logo.png")`,backgroundSize:'cover' }}></div>
            <h4 style={{ fontWeight: 400 }}>
              <div style={{ fontSize: '2rem' }}>Chào mừng bạn quay trở lại,</div>
              <span style={{ fontSize: '1.5rem' }} >
                Vui lòng đăng nhập vào tài khoản của bạn 
              </span>
            </h4>
            <Divider />
            <div>
              <Form layout={'vertical'} onFinish={onFinish}>
                <Row>
                  <Col xs={24} md={12} className='col-input-form-login'>
                    <Form.Item name='email' label='Tài khoản'>
                      <Input className='input-login ' placeholder='Nhập tài khoản' />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} className='col-input-form-login'>
                    <Form.Item name='password' label='Mật khẩu'>
                      <Input.Password value='' className='input-login' placeholder='Nhập mật khẩu...' />

                    </Form.Item>
                  </Col>

                </Row>
                <Row>
                  <Divider style={{ margin: '0 0 10px 0' }} />
                </Row>
                <Row >
                  <Form.Item>
                    <Button type='primary' htmlType='submit' style={{ fontSize: '15px', fontWeight: 500, borderRadius: '3px', background: '#545cd8' }}>Đăng nhập
                    {isLogin.isloading === true ? (<Spin animation="border" variant="primary" />) : (<></>)}</Button>
                  </Form.Item>

                </Row>
              </Form>
            </div>
          </Col>

        </Col>
      </Row>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isLogin: state.loginData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAct: bindActionCreators(loginAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
