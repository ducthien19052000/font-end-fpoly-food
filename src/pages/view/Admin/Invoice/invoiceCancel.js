import { Button, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { API_BASE_URL } from "../../../../constants";
import * as invoiceAction from "../../../../redux/Action/invoiceAction";
import "./index.css";
import InvoiceDetail from "./invoiceDetail";

const InvoiceCancel = ({ invoiceAct, litsInvoice,change }) => {
    const [isModal, setIsModal] = useState(false);
    const [id,setId] = useState()
    const [data,setData] = useState()
    const handleOk = (e) => {
      setIsModal(false);
    };
    const token = localStorage.getItem("accessToken");
    const handleCancel = (e) => {
      setIsModal(false);
    };
      const fetchEmployee = useCallback(() => {
        fetch(
          API_BASE_URL+`/invoice?status=cancel`,
          {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }),
          }
        ).then((res) => res.json())
        .then((res) => {
          if (res.error) {
            throw res.error;
          }
          console.log(res)
          setData(res.body.content);
    
          return res;
        })
        .catch((error) => {console.log(error)});;
        }, [token]);
        useEffect(() => {
          fetchEmployee();
        }, [fetchEmployee,isModal,change]);
        
        const showDetail=(id) =>{
          setIsModal(true);
          setId(id)
        }
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
        title: "",
        dataIndex: "",
        with: "15%",
        key: "x",
        render: (text, record) => (
          <>
            {" "}
            <>
              <Button onClick= {()=>showDetail(record.id)}> Chi tiết</Button>
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
                  dataSource={data}
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
  
export default  connect(mapStateToProps, mapDispatchToProps)(InvoiceCancel)
