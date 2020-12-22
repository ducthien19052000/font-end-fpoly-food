import { Button, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { API_BASE_URL } from "../../../../constants";
import * as invoiceAction from "../../../../redux/Action/invoiceAction";
import "./index.css";
import InvoiceDetail from "./invoiceDetail";

const InvoiceShip = ({ invoiceAct, litsInvoice,change }) => {
    const [isModal, setIsModal] = useState(false);
    const [id,setId] = useState()
    const handleOk = (e) => {
      setIsModal(false);
    };
    const handleCancel = (e) => {
      setIsModal(false);
    };
  
      const fetchEmployee = useCallback(() => {
          const { getData } = invoiceAct;
          getData(change);
        }, [change,invoiceAct]);
        useEffect(() => {
          fetchEmployee();
        }, [fetchEmployee,isModal,id],);
    
        
        const handleChangeActive = (id) => {
          fetch(API_BASE_URL+`/invoice/finish/${id}`)
            .then((res) => res.json())
            .then((res) => {
              if (res.error) {
                throw res.error;
              }
              setId(id)
              return res;
            })
            .catch((error) => {});
          handleCancel();
        };
    const columns = [
      {
        title: "Tên khách hàng",
        dataIndex: "",
      render: (text,record) => {
        if(record.status==="Chưa_sử_lý"){
        return <span style={{fontWeight:'bold'}}>{record.users.name}</span>
        }
        else{
          return <span >{record.users.name}</span>
        }
      },
      },
      {
        title: "Địa chỉ",
        dataIndex: "",
        render: (text,record) => {
          if(record.status==="Chưa_sử_lý"){
          return <span style={{fontWeight:'bold'}}>{record.deliveryAddress}</span>
          }
          else{
            return <span >{record.deliveryAddress}</span>
          }
        },
      },
      {
        title: "Thời gian nhận hàng dự kiến",
        dataIndex: "",
        render: (text, record) => {
          if (record.status === "new") {
            return (
              <span style={{ fontWeight: "bold" }}>{record.receivingTime}</span>
            );
          } else {
            return <span>{record.receivingTime}</span>;
          }
        },
      },
      {
        title: "Ngày đặt hàng",
        dataIndex: "",
        render: (text,record) => {
          if(record.status==="Chưa_sử_lý"){
          return <span style={{fontWeight:'bold'}}>{record.createdAt}</span>
          }
          else{
            return <span >{record.createdAt}</span>
          }
        },
      },
      {
        title: "Số điện thoại",
        dataIndex: "",
        render: (text,record) => {
          if(record.status==="Chưa_sử_lý"){
          return <span style={{fontWeight:'bold'}}>{record.phone}</span>
          }
          else{
            return <span >{record.phone}</span>
          }
        },
      },
      {
        title: "Hình thức thanh toán",
        dataIndex: "",
        render: (text,record) => {
          if(record.status==="Chưa_sử_lý"){
          return <span style={{fontWeight:'bold'}}>{record.paymentMethods}</span>
          }
          else{
            return <span >{record.paymentMethods}</span>
          }
        },
      },
     
  
      {
        title: "   ",
        dataIndex: "",
        with: "15%",
        key: "x",
        render: (text, record) => (
          <>
            {" "}
            <>
              <Button onClick= {()=>handleChangeActive(record.id)}> Hoàn thành</Button>
              {/* <Button  ><EditFilled /></Button> */}
            </>
          </>
        ),
      },
    ];
    
  
    return (
      <>
       
                <Table
                  className="table-food-admin"
                  columns={columns}
                  scroll={{ x: '100vh' }}
                  expandable={{
                    expandedRowRender: (record) => (
                      <p style={{ margin: 0 }}>{record.name}</p>
                    ),
                  }}
                  dataSource={litsInvoice}
                />
             
            {isModal === true ? (
            <InvoiceDetail
            id={id}
            visible={isModal}
              handleOk={handleOk}
              handleCancel={handleCancel}
            />
          ) : (
            ""
          )}
        
      </>
    );
  };
  
  
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
  
export default  connect(mapStateToProps, mapDispatchToProps)(InvoiceShip)
