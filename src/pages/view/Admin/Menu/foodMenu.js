import { Button, Col, Input, List, Modal, notification, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../../constants';

const FoodMenu = ({ isModal, handleOk, handleCancel, id }) => {
    const [data, setData] = useState([])
    const [topping, setTopping] = useState([])
    const isLogin = localStorage.getItem('islogin')
    
    const [search, setSearch] = useState("");



    const onchange = e => {
        const { value } = e.target;
        setSearch(value);

    };
    const product = topping.filter(pr => {
        return pr.productName.toLowerCase().indexOf(search.toLowerCase()) !== -1;

    });
    useEffect(() => {
        fetch(API_BASE_URL + `/menu/${id}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    throw res.error;
                }
                setData(res.body.content)

                return res;
            })
            .catch((error) => { });
    }, [id]);
    useEffect(() => {
        fetch(API_BASE_URL + `/product/`, {

            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': `Bearer ${isLogin}`
            })


        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    throw res.error;
                }
                setTopping(res.body.content)

                return res;
            })
            .catch((error) => { });
    }, [id, isLogin]);
    const checkDisable = (data, record) => {
        var check = false;
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === record.id) {
                    check = true
                    break
                }
            }
        }
        return check;
    }
    const handleDelete = (id) => {
   
        const newdata = data.filter(product => product.id !== id);
        setData(newdata)
    }
    const handleAdd = (topping) => {
        

        setData([...data, topping])
    }
    const handleUpdate = (topping) => {
        const idproduct = topping.map(item=>{return item.id})
        const newData = { productId: idproduct }
       
        fetch(API_BASE_URL + `/menu/add-product/${id}`, {

            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': `Bearer ${isLogin}`
            }),
            body: JSON.stringify(newData)


        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    throw res.error;
                }
                if (res.description === "Successful") {
                    notification['success']({
                        message: 'Thông báo',
                        description:
                            'Cập nhật thành công'
                    })
                    handleCancel()
                }

                return res;
            })
            .catch((error) => { });
    }

    const columnAll = [
        {
            title: "Tên món ăn",
            dataIndex: "productName",
            render: (text) => <span>{text}</span>,

        },



        {
            title: "",
            dataIndex: "",
            with: 3,

            key: "x",
            render: (text, record) => (
                <>
                    {" "}
                    <>
                        {checkDisable(data, record) ?
                            <Button type='primary' onClick={() => handleDelete(record.id)}>
                                <b>-</b>
                            </Button> : <Button type='primary' onClick={() => handleAdd(record)}>
                                <b>+</b>
                            </Button>}


                    </>
                </>
            ),
        },
    ];


    return (
        <div>
            <Modal
                title="Chi tiết"
                visible={isModal}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1200}
                footer={null}
            >
                <Row>
                    <Col xs={24} md={12}>
                        <div style={{ margin: '10px' }}>
                            <Row>
                                <Col xs={24} md={5} style={{ height: "30px", lineHeight: '36px' }}>
                                    <h3>Tất cả món ăn</h3>
                                </Col>
                                <Col xs={24} md={10}>

                                    <Input placeholder="Tìm món ăn" size="large" style={{ width: 'auto' }} name='search' type="text" onChange={onchange} />

                                </Col>

                            </Row>
                            <Row>
                                <Table
                                    className="table-food-admin"
                                    columns={columnAll}

                                    pagination={{pageSize:5}}
                                    dataSource={product}

                                />
                            </Row>
                        </div>

                    </Col>
                    <Col xs={24} md={12}>
                        <div style={{ margin: '10px' }}>
                            <Row>
                                <h3>Món đã thêm</h3>
                            </Row>
                            <Row>
                                {data && data.length !== 0 ? 
                                 <List
                                 style={{width:'100%'}}
                                 grid={{ gutter: 16, column: 4 }}
                                 dataSource={data}
                                 renderItem={item => (
                                 
                                     <List.Item style={{padding:'10px',border:'1px solid',borderRadius:'4px',textAlign:'center'}}>
                                       <span style={{fontSize:'16px',fontWeight:500}}>  {item.productName}</span>
                                         </List.Item>
                                   
                                
                              
                                    )} /> : ""}

                            </Row>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Button type='primary' onClick={() => handleUpdate(data)}>Cập nhật</Button>
                   
                </Row>
            </Modal>
        </div>
    )
}

export default FoodMenu
