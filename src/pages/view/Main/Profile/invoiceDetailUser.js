import { Button, Col, Image, Modal, notification, Row, Table } from "antd";
import confirm from "antd/lib/modal/confirm";
import React from "react";
import {ExclamationCircleOutlined} from '@ant-design/icons'
import { API_BASE_URL } from "../../../../constants";

const InvoiceDetailUser = ({
    visible,
    handleOk,
    handleCancel,
    data
}) => {
 

    const columns = [
        {
            title: "",
            dataIndex: "",
            render: (text, record) =>
                <Image  src={record.productInfo.image} width={'96px'} />
        },
        {
            title: "Tên món ăn",
            dataIndex: "",
            render: (text, record) =>

                <span style={{ fontWeight: "bold" }}>{record.productInfo.productName}</span>

        },
        {
            title: "Giá",
            dataIndex: "",
            render: (text, record) =>

                <span style={{ fontWeight: "bold" }}>{record.productInfo.price}</span>

        },
        {
            title: "Số lượng",
            dataIndex: "",
            render: (text, record) =>

                <span style={{ fontWeight: "bold" }}>{record.productInfo.quantity}</span>

        },
        {
            title: "Thành tiền",
            dataIndex: "",
            render: (text, record) =>

                <span style={{ fontWeight: "bold" }}>{record.productInfo.amount}</span>

        },

    ];
    const handleCancelInvoice=()=>{
        confirm({
            title: 'Xác nhận',
            icon: <ExclamationCircleOutlined />,
            content: 'Nhận đơn hàng',
            okText: 'Có',
            cancelText: 'Không',
            onOk(){
              fetch(API_BASE_URL+`/invoice/cancel/${data.invoiceInfo.id}`)
              .then((res) => res.json())
              .then((res) => {
                if (res.error) {
                  throw res.error;
                }
                notification['success']({
                    message: 'Thông báo',
                    description:
                      'Đã hủy đơn hàng'
                })
             handleCancel()
          
                return res;
              })
              .catch((error) => {});
              handleCancel()
            }
        
        }
          )
    }
   
    return (
        <Modal
            title="Chi tiết"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1200}
            footer={null}
        >
            {data && (
                <Row>
                    <Col xs={24} md={6}>
                        <div className="invoice__detailInfoUser">
                            <Row>
                                <h2>Thông tin khách hàng</h2>
                            </Row>

                            <p>{data.invoiceInfo.fullName}</p>
                            <Row>
                                <p style={{ width: "100%", margin: 0, fontWeight: "bold" }}>
                                    Email{" "}
                                </p>
                                <p> {data.invoiceInfo.users.email}</p>
                            </Row>
                            <Row>
                                <p style={{ width: "100%", margin: 0, fontWeight: "bold" }}>
                                    Giao tại{" "}
                                </p>
                                <p> {data.invoiceInfo.deliveryAddress}</p>
                            </Row>
                            <Row>
                                <p style={{ width: "100%", margin: 0, fontWeight: "bold" }}>
                                    Phương thức thanh toán{" "}
                                </p>
                                <p> {data.invoiceInfo.paymentMethods} </p>
                            </Row>
                            <Row>
                                <p style={{ width: "100%", margin: 0, fontWeight: "bold" }}>
                                    Thời gian đặt hàng{" "}
                                </p>
                                <p>  {data.invoiceInfo.createdAt}</p>
                            </Row>
                            <Row>
                                <p style={{ width: "100%", margin: 0, fontWeight: "bold" }}>
                                    Ghi chú
                </p>
                                <p> {data.invoiceInfo.description}</p>
                            </Row>
                            <Row>
                                <p style={{ width: "100%", margin: 0, fontWeight: "bold" }}>
                                    Tổng tiền
                </p>
                                <p> {data.invoiceInfo.amountTotal}</p>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                {(data.invoiceInfo.status === "watched" || data.invoiceInfo.status === "new") && <Col span={12}>
                                    <div style={{ padding: "0 10px" }}>
                                        <Button onClick={()=>handleCancelInvoice()}>Hủy đơn hàng</Button>
                                    </div>
                                </Col>}

                            </Row>
                        </div>
                    </Col>
                    <Col xs={24} md={18}>
                        <Table
                            className="table-food-admin"
                            columns={columns}
                            scroll={{ x: "100vh" }}
                            expandable={{
                                expandedRowRender: (record) => (
                                <p style={{ margin: 0 }}>{record.toppingList.name}</p>
                                ),
                         
                                defaultExpandAllRows:true
                            
                               
                            }}
                            dataSource={data.cartProduct}
                        />


                    </Col>
                </Row>
            )}
            {data === null && <></>}
        </Modal>
    );
};

export default InvoiceDetailUser;
