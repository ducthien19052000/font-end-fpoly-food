import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, notification, Pagination, Row, Select, Table, Tooltip } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import confirm from 'antd/lib/modal/confirm';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_BASE_URL } from '../../../../constants';
import { addToCart, deleteAllCart, getNumbers, removeToCart, updateToCart } from '../../../../redux/Action/cartBookingAction';
import * as foodAction from '../../../../redux/Action/index';
import * as invoiceUserAction from '../../../../redux/Action/invoiceBookAction';
import './index.css';
import ProductItemInvoice from './ProductItemInvoice';
import UpdateCartBook from './updateCartBook';



const EditInvoiceBook = ({ products, onDeletePrToCart, onDeleteAllToCart, invoice, onGetDataCart,onUpdatePrToCart, isModalVisible, handleCancel, handleOk, cart }) => {


    const [isModal, setIsModal] = useState(false);
    const [productCurrent,setProductCurrent] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const prsPerPage = 4;
    const indexOfLastPost = currentPage * prsPerPage;
    const indexOfFirtPost = indexOfLastPost - prsPerPage;
    const [form] = useForm()
    // useEffect(()=>{
    //     onGetDataCart(invoice.cartProduct)
    // },[])
 
    const user = {name:invoice.invoiceInfo.users.name,phone:invoice.invoiceInfo.phone,address:invoice.invoiceInfo.deliveryAddress,description:invoice.invoiceInfo.description}
    form.setFieldsValue(user)
    const handleRemoveItemCart = (product, topping) => {
        onDeletePrToCart(product, topping);
        notification["success"]({
            message: "",
            duration: 2,
            description: "Xóa thành công",
        });
    }


    const [search, setSearch] = useState("");

    const handleOkCart = () => {
        setIsModal(false);
      };
    
      const handleCancelCart = () => {
         
        setIsModal(false);
      };

    const onchange = e => {
        const { value } = e.target;
        setSearch(value);

    };
    const product = products.filter(pr => {
        return pr.productName.toLowerCase().indexOf(search.toLowerCase()) !== -1;

    });
    const newProduct = product.slice(indexOfFirtPost, indexOfLastPost)
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(product.length / prsPerPage); i++) {
        pageNumbers.push(i);
    }


    const token = localStorage.getItem("accessToken");


    const onChange = (page, pageSize) => {
        setCurrentPage(page)
    }
    const showDetail=(data)=>{
        setProductCurrent(data)
        setIsModal(true);
         
       }
    const columns = [
        {
            title: "Tên món ăn",
            dataIndex: "product",
            fixed: 'left',
            with: "20%",
            render: (text, index) => <span key={index}>{text.productName}</span>,
        },
        {
            title: "Giá",
            dataIndex: "product",
            with: "20%",
            render: (text, index) => <span key={index}>{text.price}</span>,
        },

        {
            title: "Số lượng",
            dataIndex: "quantity",
            with: "20%",
            render: (text, index) => <span key={index}>{text}</span>,
        },

        {
            title: "Ghi chú",
            dataIndex: "note",
            with: "20%",
            ellipsis: {
                showTitle: false,
            },
            render: note => (
                <Tooltip placement="topLeft" title={note} >
                    {note}
                </Tooltip>
            ),
        },
        {
            title: "Thành tiền",
            with: "20%",
            render: (record, index) => <span key={index}> {showTotal(record)} đ</span>,



        },
        {
            title: "",
            dataIndex: "",
            with: "20%",
            fixed: 'right',
            key: "x",
            render: (text, record, index) => (
                <div key={index}>
                    <Button onClick={() => handleRemoveItemCart(record.product, [])} >
                        <DeleteFilled />
                    </Button>
                    <Button>
                        <EditFilled  onClick={()=>showDetail(record)}/>
                    </Button>
                </div>

            ),
        },
    ];

    const handleDeleteAllCart = (data) => {
        confirm({
            title: "Bạn muốn hủy giỏ hàng?",
            content: '',
            okText: "Xác nhận",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                onDeleteAllToCart(data);
                notification["success"]({
                    message: "",
                    duration: 2,
                    description: "Hủy thành công",
                });

            },
            onCancel() { },
        });


    };



    const showAmount = (ct) => {
        var total = 0;
        if (ct.length > 0) {
            for (var i = 0; i < ct.length; i++) {
                total += ct[i].product.price * ct[i].quantity;
            }
            return total;
        }
    };
    const cartRequests = cart.map((item, index) => {
        return {
            productId: item.product.id,
            quantity: item.quantity,
            listToppingId: [],
            note: item.note
        }
    })
   
    const onFinish = values => {
        const amount = showAmount(cart)
        const data = { amountTotal: amount, paymentMethods: "Trả khi nhận hàng", cartRequests: cartRequests, fullName: values.name, phone: values.phone,deliveryAddress:values.address,description:values.description,email:user.email }
      
        fetch(API_BASE_URL + `/order-by-date/${invoice.invoiceInfo.id}`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }),
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    throw res.error;
                }
                onDeleteAllToCart([])
                notification["success"]({
                    message: "",
                    duration: 2,
                    description: "Cập nhật hóa đơn thành công",
                });
                handleCancel()

                return res;
            })
            .catch((error) => { });

    };
    ///showTotalPrice
    const showTotal = (ct) => {
        var total = 0;
        if (ct) {
            total += ct.product.price * ct.quantity;

            return total;
        }
    };
    return (
        <div>



            <Modal title="Chọn món ăn" visible={isModalVisible} width={1500} style={{ top: 20 }} footer={null} onOk={handleOk} onCancel={handleCancel}>
                <Row >
                    <Col xs={24} lg={24}>


                        <Row className="top-content-food">
                            <Col xs={24} md={12}>
                                <Row>
                                    <Col xs={24} lg={5} className="col-search-food">

                                        <Input placeholder="Tìm món ăn" size="large" name='search' type="text" onChange={onchange} />

                                    </Col>
                                    {/* <Col xs={0} md={6} className="col-search-food"> 
                                    <Select defaultValue="lucy" size='large' style={{ width: 120 }}>
                                        <Select.Option value="jack" >Thực đơn theo ngày</Select.Option>
                                        <Select.Option value="lucy">Tất cả</Select.Option>

                                    </Select></Col> */}
                                    <Col xs={0} md={13}></Col>
                                </Row>
                                <Row>
                                    <Col xs={24} lg={24}>


                                        <Row>


                                            {newProduct.map((item, index) => (
                                                <ProductItemInvoice product={item} key={index} />
                                            )

                                            )}

                                        </Row>
                                        <Row >
                                            <span style={{ margin: 'auto' }}>
                                                <Pagination defaultCurrent={1} total={product.length} pageSize={4} onChange={onChange} />
                                            </span>


                                        </Row>

                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form layout={'horizontal'} onFinish={onFinish} form={form}
                                >
                                    <Row>

                                        <Col xs={24} lg={24}>
                                            <Row style={{ margin: 0 }}>

                                                <Col xs={24} lg={12} className="col-search-food">
                                                    <Form.Item label="Tên khách hàng" name='name' className='form-item-admin-cart'  >
                                                        <Input />
                                                    </Form.Item>



                                                </Col>
                                                <Col xs={24} md={12} className="col-search-food">
                                                    <Form.Item label="Số điện thoại" name='phone' className='form-item-admin-cart'>
                                                        <Input />
                                                    </Form.Item></Col>


                                            </Row>
                                            <Row style={{ margin: 0 }}>

                                                <Col xs={24} lg={12} className="col-search-food">
                                                    <Form.Item label="Địa chỉ" name='address' className='form-item-admin-cart'  >
                                                        <Input />
                                                    </Form.Item>



                                                </Col>
                                                <Col xs={24} md={12} className="col-search-food">
                                                    <Form.Item label="Ghi chú" name='description' className='form-item-admin-cart'>
                                                        <Input />
                                                    </Form.Item></Col>


                                            </Row>
                                            <Row style={{ marginBottom: '20px' }}>
                                                <Table
                                                    className="table-food-admin"
                                                    columns={columns}
                                                    pagination={false}
                                                    dataSource={cart}


                                                />
                                            </Row>
                                            <Row>
                                                {cart.length !== 0 && <>

                                                    <Form.Item>
                                                        <Button type="primary" htmlType='submit' style={{ marginRight: '30px', borderRadius: '4px' }} size='large' >Xác nhận</Button>
                                                    </Form.Item>
                                                    <Button type='primary' size='large' onClick={() => handleDeleteAllCart([])} >Hủy</Button></>}

                                            </Row>

                                        </Col>
                                    </Row>
                                </Form>
                            </Col>

                        </Row>

                    </Col>

                    {isModal === true ? (
          <UpdateCartBook
            isModal={isModal}
            onUpdateToCart=  {onUpdatePrToCart}
           product={productCurrent}
            handleOk={handleOkCart}
            handleCancel={handleCancelCart}
          />
        ) : (
          ""
        )}
                </Row>
            </Modal>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        litsFood: state.foodData.lists,
        cart: state.CartBookData,
        invoiceUser: state.invoiceUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        foodAct: bindActionCreators(foodAction, dispatch),
        invoiceAct: bindActionCreators(invoiceUserAction, dispatch),
        onGetDataCart: (data) => {
            dispatch(getNumbers(data))
        },
        onDeletePrToCart: (product, topping) => {
            dispatch(removeToCart(product, topping));
        },
        onUpdatePrToCart: (product, quantity, topping, note) => {
            dispatch(updateToCart(product, quantity, topping, note));
        },
        AddToCart: (product, quantity, topping, note) => {
            dispatch(addToCart(product, quantity, topping, note));
        },
        onDeleteAllToCart: (product) => {
            dispatch(deleteAllCart(product));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInvoiceBook);


