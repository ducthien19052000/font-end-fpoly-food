import { Col, Row, Tabs } from "antd";
import Search from "antd/lib/input/Search";
import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as invoiceAction from "../../../../redux/Action/invoiceAction";
import "./index.css";
import InvoiceActive from "./invoiceActive";
import InvoiceAll from "./invoiceAll";
import InvoiceCancel from "./invoiceCancel";
import InvoiceDetail from "./invoiceDetail";
import InvoiceShip from "./InvoiceShip";
import InvoiceSuccess from "./invoiceSucces";

const { TabPane } = Tabs;

const Invoice = ({ invoiceAct, litsInvoice }) => {
  const [isModal, setIsModal] = useState(false);
  const [key,setKey] = useState('new')
 
  const handleOk = (e) => {
    setIsModal(false);
  };
  const handleCancel = (e) => {
    setIsModal(false);
  };
  
   
    
      const callback=(key)=> {
        setKey(key)
      }

  return (
    <>
      <Row className="title-content-admin">
        <h4 className="title-h4">Quản lý hóa đơn</h4>
      </Row>
      <Row className="site-layout-content-admin">
        <Col xs={24} lg={24}>
          <Row className="top-content-food">
            <Col xs={24} lg={12} className="col-add-food">
              
            </Col>
            <Col span={6}></Col>
            <Col xs={24} lg={5} className="col-search-food">
              <Search
                placeholder="Tìm kiếm hóa đơn"
                size="large"
                enterButton
              />
            </Col>
          </Row>
          <Row>
          <Col xs={24} lg={24} className='invoiceTabs'>
          <Tabs defaultActiveKey="new" type="card" size='large' onChange={callback}>
          <TabPane tab="Tổng quan" key="new">
            <InvoiceAll change={key}/>
          </TabPane>
          <TabPane tab="Đang chế biến" key="processing" >
            <InvoiceActive change={key}/>
          </TabPane>
          <TabPane tab="Đang vận chuyển" key="transport">
          <InvoiceShip change={key}/>

          </TabPane>
          <TabPane tab="Hoàn thành" key="finish">
          <InvoiceSuccess change={key}/>

          </TabPane>
          <TabPane tab="Hủy" key="cancel">
          <InvoiceCancel change={key}/>

          </TabPane>
        </Tabs>
            </Col>
         
          </Row>
          {isModal === true ? (
          <InvoiceDetail
     
          visible={isModal}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        ) : (
          ""
        )}
        </Col>
      </Row>
    </>
  );
};

Invoice.propTypes = {};
const mapStateToProps = (state) => {
  return {
    litsInvoice: state.invoiceData.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    invoiceAct: bindActionCreators(invoiceAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
