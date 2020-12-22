import { Button, Table } from "antd";
import confirm from "antd/lib/modal/confirm";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as invoiceAction from "../../../../redux/Action/invoiceAction";
import "./index.css";
import InvoiceDetail from "./invoiceDetail";
import {ExclamationCircleOutlined} from '@ant-design/icons'   
import { API_BASE_URL } from "../../../../constants";

const InvoiceAll = ({ invoiceAct, litsInvoice,change }) => {
  const [isModal, setIsModal] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState();
 
  const handleOk = (e) => {
    setIsModal(false);
  };
  console.log(change)

  const handleCancel = (e) => {
    setIsModal(false);
  };
  const fetchEmployee = useCallback(() => {
    const { getData } = invoiceAct;
    getData(change);
  }, [change,invoiceAct]);
  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee,isModal]);
 
  const handleChangeActive=(id)=>{
      confirm({
        title: 'Xác nhận',
        icon: <ExclamationCircleOutlined />,
        content: 'Nhận đơn hàng',
        okText: 'Có',
        cancelText: 'Không',
        onOk(){
          fetch(API_BASE_URL+`/invoice/processing/${id}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              throw res.error;
            }
      
            setData(res.body);
      
            return res;
          })
          .catch((error) => {});
          handleCancel()
        }
    
    }
      )
}
  
  const showDetail = (id) => {
    setIsModal(true);
    fetch(API_BASE_URL+`/invoice/details/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }

        setData(res.body);

        return res;
      })
      .catch((error) => {});
    setId(id);
  };
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "",
      render: (text, record) => {
        if (record.status === "new") {
          return <span style={{ fontWeight: "bold" }}>{record.users.name}</span>;
        } else {
          return <span>{record.users.name}</span>;
        }
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "",
      render: (text, record) => {
        if (record.status === "new") {
          return (
            <span style={{ fontWeight: "bold" }}>{record.deliveryAddress}</span>
          );
        } else {
          return <span>{record.deliveryAddress}</span>;
        }
      },
    },
    {
      title: "Thời gian nhận hàng ",
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
      render: (text, record) => {
        if (record.status === "new") {
          return <span style={{ fontWeight: "bold" }}>{record.createdAt}</span>;
        } else {
          return <span>{record.createdAt}</span>;
        }
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "",
      render: (text, record) => {
        if (record.status === "new") {
          return <span style={{ fontWeight: "bold" }}>{record.phone}</span>;
        }
         else {
          return <span> {record.phone}</span>;
        }
      },
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "",
      render: (text, record) => {
        if (record.status === "new") {
          return (
            <span style={{ fontWeight: "bold" }}>{record.paymentMethods}</span>
          );
        } else {
          return <span>{record.paymentMethods}</span>;
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
            <Button onClick={() => showDetail(record.id)}> Chi tiết</Button>
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
          key={id}
          handleChangeActive={handleChangeActive}
          visible={isModal}
          data={data}
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceAll);
