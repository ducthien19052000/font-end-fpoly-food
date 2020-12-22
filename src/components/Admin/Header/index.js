import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Dropdown, Layout, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';






const Header = () => {
    const history = useHistory();
    function confirm() {
        localStorage.removeItem("islogin");
        localStorage.removeItem("role");

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
                    
                    </Col>

                </Row>
                <Divider style={{ margin: '10px 0' }} />
                <Row style={{ padding: '0px 0px 5px 10px' }}>
                        <Button onClick={confirm}>Log out</Button>
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
