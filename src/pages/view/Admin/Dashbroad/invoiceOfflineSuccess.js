import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../constants";
import "./index.css";
import InvoiceDetailOffline from "./invoiceDetailOffline";


const InvoiceOfflineSuccess = ({ key }) => {

    const [isModal, setIsModal] = useState(false);
    const [dataTable, setDataTable] = useState();
    const [id, setId] = useState();
    const [data, setData] = useState();
   

    const handleOk = (e) => {
        setIsModal(false);
    };


    const handleCancel = (e) => {
        setIsModal(false);
    };
    useEffect(() => {
        fetch(API_BASE_URL + `/invoice/offline?status=finish`)
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    throw res.error;
                }

                setDataTable(res.body.content);

                return res;
            })
            .catch((error) => { });
    }, [isModal, key]);

   

    const showDetail = (id) => {
        setIsModal(true);
       setData(id)
        setId(id);
    };
    const columns = [

        {
            title: "Mã đơn hàng",
            dataIndex: "",
            render: (text, record) => {

                return <span>{record.id}</span>;

            },
        },

        {
            title: "Ngày đặt hàng",
            dataIndex: "",
            render: (text, record) => {

                return <span>{record.createdAt}</span>;

            },
        },

        {
            title: "Tổng tiền",
            dataIndex: "",
            render: (text, record) => {

                return <span>{record.amountTotal} đ</span>;

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
                dataSource={dataTable}
            />
           {isModal === true ? (
        <InvoiceDetailOffline
          id={id}
          key={id}
          
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




export default InvoiceOfflineSuccess
