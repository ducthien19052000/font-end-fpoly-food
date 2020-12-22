import {
    DesktopOutlined,

    FileOutlined, PieChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Row } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

  
 

const Slider = () => {
    const {   Sider } = Layout;
    const { SubMenu } = Menu;
    const [collapsed,setCollapsed] = useState(false)
   
    
    const  toggle = () => {
       setCollapsed(!collapsed)
      };
    
    return (
        <>
              <Sider  className='slider-admin' collapsible collapsed={collapsed} onCollapse={toggle} >
          <Row className="top-sider" >
              
        <div style={{textAlign:'center'}}>
        <img src=' https://rawcdn.githack.com/0967517236/logo/1fc2347cddbcc19d3041ea14e01819c29e1646f7/logo.png' style={{width:'30%'}}/>
        </div>
         
            </Row> 
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to='/admin/'>
                Dashboard
                </Link>
                
            </Menu.Item>
            <Menu.Item key="6" icon={<PieChartOutlined />}>
                <Link to='/admin/statistics'>
                Thống kê
                </Link>
                
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
                <Link to='/admin/food'>
                Sản phẩm
                </Link>
              
            </Menu.Item>
            <Menu.Item key="7" icon={<PieChartOutlined />}>
                <Link to='/admin/topping'>
                Món ăn kèm
                </Link>
                
            </Menu.Item>
            <Menu.Item key="3" icon={<FileOutlined />}>
            <Link to='/admin/category' >
            Danh mục
                </Link>
              
            </Menu.Item> 
            <Menu.Item key="4" icon={<FileOutlined />}>
            <Link to='/admin/menu' >
            Thực đơn
                </Link>
              
            </Menu.Item> 
            <Menu.Item key="5" icon={<FileOutlined />}>
            <Link to='/admin/invoice'>
            Đơn hàng
                </Link>
              
            </Menu.Item>
          </Menu>
        </Sider> 
        </>
    )
}

export default Slider
