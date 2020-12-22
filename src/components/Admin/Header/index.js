import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Dropdown, Layout, Popconfirm, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';






const Header = () => {
    const history = useHistory();
    function confirm() {
        localStorage.removeItem("islogin");
        history.push("/admin/login")
    }
    const { Header } = Layout;
    const menu = (
        <Row>
            <Col xs={24} lg={24}>
                <Row style={{ width: '260px' }}>
                    <Col span={6}>
                        <Avatar icon={<UserOutlined />} />
                    </Col>
                    <Col span={18}>
                        <p>Name</p>
                        <p>Email</p>
                        <Button type='primary' style={{ borderRadius: '50px' }}>Hồ sơ</Button>
                    </Col>

                </Row>
                <Divider style={{ margin: '10px 0' }} />
                <Row style={{ padding: '0px 0px 5px 10px' }}>
                    <Popconfirm placement="top" title='Bạn có muốn đăng xuất' onConfirm={confirm} okText="Có" cancelText="Không">
                        <Button>Log out</Button>
                    </Popconfirm>
                </Row>
            </Col>
        </Row>
    );
    return (
        <>
            <Header className="site-layout-background" style={{ padding: 0, margin: 0, width: '100%' }} >
                <Row>
                    <Col xs={22} lg={22}></Col>
                    <Col xs={2} lg={2}>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Avatar size={50} icon={<UserOutlined />} />

                        </Dropdown>

                    </Col>

                </Row>
            </Header>
        </>
    )
}

export default Header
