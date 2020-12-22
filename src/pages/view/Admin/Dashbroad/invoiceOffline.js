import { Button, Col, Divider, Input, notification, Row, Table } from "antd";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../constants";
import "./index.css";
import ListProduct from "./listProduct";


const InvoiceOffline = ({ key }) => {

    const [isModal, setIsModal] = useState(false);
    const [dataTable, setDataTable] = useState();
    const [id, setId] = useState();
    const [data, setData] = useState();
    const [excess ,setExcess ]  = useState(0)
    useEffect(() => {
        fetch(API_BASE_URL + `/invoice/offline?status=new`)
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    throw res.error;
                }
                    console.log('â')
                setDataTable(res.body.content);

                return res;
            })
            .catch((error) => { });
       
    },[key, isModal]);
 

    
    const handleOk = (e) => {
        setIsModal(false);
    };


    const handleCancel = (e) => {
        setIsModal(false);
    };
  

  

    const showDetail = (id) => {
        setIsModal(true);
       setData(id)
        setId(id);
    };
    const columns = [

        {
            title: "Mã đơn hàng",
            key:"name",
            dataIndex: "",
            width: '20%',
            render: (text, record) => {

                return <span>{record.id}</span>;

            },
        },
        {
            title: "Danh sách món ăn",
            dataIndex: "",
            with:'30%',
            render: (text, record) => {
          
              return  <ListProduct id={record.id}/>
         

            },
        },


        {
            title: "Ngày đặt hàng",
            dataIndex: "",
            width: '20%',
            render: (text, record) => {

                return <span>{record.createdAt}</span>;

            },
        },

        {
            title: "Tổng tiền",
            dataIndex: "",
            width: '20%',
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
                        <Button onClick={() => showDetail(record)}> Thanh toán</Button>

                    </>
                </>
            ),
        },
    ];
    const handleChange=(e)=>{
        const value = e.target.value
        const cash =value -data.amountTotal
        setExcess(cash)
     

    }
    const handleFinish=()=>{
        if(excess>=0){
            fetch(API_BASE_URL+`/invoice/finish/${data.id}`)
            .then((res) => res.json())
            .then((res) => {
              if (res.error) {
                throw res.error;
              }
              handleCancel();
              notification["success"]({
                message: "",
                duration: 2,
                description: "Thành công",
              });
              return res;
            })
            .catch((error) => {});
         
        }
        else{
            notification["warning"]({
                message: "Kiểm tra lại tiền nhận",
                duration: 2,
                description: "",
              });
        }
    }

    return (
        <>
            <Table
                className=""
                columns={columns}
                scroll={{ x: '100vh' }}
               
                dataSource={dataTable}
                pagination={null}
            />
            <Modal
                title="Thanh toán"
                visible={isModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Form onFinish={handleFinish}>
                <Row  >
                    <Col xs={24} md={7}>
                        <span className='checkOutAdmin'>Tổng chi phí </span>                     
                        </Col>
                    <Col xs={24} md={12}> 
                   {data&& <span className='checkOutAdmin'> {data.amountTotal} đ
                        </span>}
                        </Col>
                </Row>
                <Row style={{lineHeight:'3.6rem',margin:'20px 0'}}>
                <Col xs={24} md={7}>
                        <span className='checkOutAdmin'>Tiền khách trả </span>                     
                        </Col>
                    <Col xs={24} md={12}> 
                    <FormItem name='quantity' style={{margin:0}} rules={[{required:true,message:'Nhập số tiền nhận'}]}>
                    <Input type='number' size='large' onChange={(e)=>handleChange(e)} />
                    </FormItem>
                
                        </Col>
                </Row>
                <Divider/>
                <Row>
                <Col xs={24} md={7}>
                        <span className='checkOutAdmin'>Tiền thừa</span>                     
                        </Col>
                    <Col xs={24} md={12}> 
                   {data&& <span className='checkOutAdmin'> {excess} đ
                        </span>}
                        </Col>
                </Row>
                <Divider/>
                <Row>
                    <Button type='primary' htmlType='submit' >Thanh toán</Button>
                </Row>
                </Form>
                

            </Modal>

        </>
    );
};




export default InvoiceOffline
