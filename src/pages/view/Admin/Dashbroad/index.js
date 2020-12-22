import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, notification, Pagination, Row, Table, Tabs, Tooltip } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_BASE_URL } from '../../../../constants';
import { addToCart, deleteAllCart, removeToCart, updateToCart } from '../../../../redux/Action/cartAdminAction';
import * as foodAction from '../../../../redux/Action/index';
import './index.css';
import InvoiceOffline from './invoiceOffline';
import InVoiceOfflineSuccess from './invoiceOfflineSuccess';
import ProductItemAdmin from './ProductItemAdmin';
import UpdateItemCart from './updateCartitem';


const Dashboard = ({ litsFood, foodAct, cart, AddToCart,onDeleteAllToCart,onDeletePrToCart,onUpdatePrToCart}) => {
    const { TabPane } = Tabs;
    const [isModalVisible, setIsModalVisible] = useState(false);
  const [productCurrent,setProductCurrent] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const prsPerPage  = 8;
    const indexOfLastPost = currentPage * prsPerPage;
    const indexOfFirtPost = indexOfLastPost - prsPerPage;
    const [form] = Form.useForm();
  
    const [key,setKey] = useState('new')

    const fetchEmployee = useCallback(() => {
        const { getData } = foodAct;


        getData();
    }, [foodAct]);
    console.log(cart)
    useEffect(() => {
        fetchEmployee();
    }, [fetchEmployee,key]);
    
    const handleRemoveItemCart=(data)=>{
        onDeletePrToCart(data);
        notification["success"]({
            message: "",
            duration: 2,
            description: "Xóa thành công",
          });
    }
   
  
    const [search, setSearch] = useState("");



    const onchange = e => {
        const {  value } = e.target;
        setSearch(value);
       
    };
    const product = litsFood.filter(pr => {
        return pr.productName.toLowerCase().indexOf(search.toLowerCase()) !== -1;

    });
    const newProduct = product.slice(indexOfFirtPost, indexOfLastPost)
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(product.length / prsPerPage); i++) {
        pageNumbers.push(i);
    }
  

    const token = localStorage.getItem("islogin");

  

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
                    <Button onClick={()=>handleRemoveItemCart(record.product)} >
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
            onCancel() {},
          });
       
       
    };
    const onChange=(page)=>{
        setCurrentPage(page)
        console.log(page)
    }
    const showDetail=(data)=>{
        setProductCurrent(data)
         setIsModalVisible(true);
         
       }
       const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
         
        setIsModalVisible(false);
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
      const cartRequests = cart.map((item,index)=>{return {
        productId : item.product.id,
        quantity: item.quantity,
        listToppingId:[],
        note:item.note
      }})
    const onFinish = values => {
    const amount = showAmount(cart)
        const data = {amountTotal:amount,paymentMethods : "Trả khi nhận hàng",
        cartRequests:cartRequests,fullName:values.name,phone:values.phone }     
       
        fetch(API_BASE_URL+`/invoice/offline`,{
            method: "POST",
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
                description: "Thêm hóa đơn thành công",
              });

            return res;
          })
          .catch((error) => {console.log(error)});
          console.log('a')
      };
      ///showTotalPrice
  const showTotal = (ct) => {
    var total = 0;
    if (ct) {
        total += ct.product.price * ct.quantity;
      
      return total;
    }
  };
  const callback=(key)=> {
    setKey(key)
  }
    return (
        <div className='dasboarh'>
            <Tabs defaultActiveKey="new"  type="card" size='large' onChange={callback}>
          <TabPane tab="Tổng quan" key="new">
          
            <Row className="site-layout-content-admin">
                <Col xs={24} lg={24}>


                    <Row className="top-content-food">
                        <Col xs={24} md={12}>
                            <Row>
                                <Col xs={24} lg={5} className="col-search-food">

                                    <Input placeholder="Tìm món ăn" size="large" name='search' type="text" onChange={onchange} />

                                </Col>
                                <Col xs={0} md={6}></Col>
                                <Col xs={0} md={13}></Col>
                            </Row>
                            <Row>
                                <Col xs={24} lg={24}>


                                    <Row style={{minHeight:'60vh'}}>


                                        {newProduct.map((item, index) => (
                                            <ProductItemAdmin product={item} key={index} />
                                        )

                                        )}
                                        
                                    </Row>
                                    <Row>
                                    <div style={{textAlign:'center',width:'100%'}}>
                                    <Pagination total={product.length} current={currentPage} onChange={onChange} pageSize={8} />
                                    </div>
                                        
                                   


                                    </Row>
                                   
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form layout={'horizontal'}
                                form={form}
                                onFinish={onFinish}>
                                    
                                        
                                <Row>

                                    <Col xs={24} lg={24}>
                                        <Row style={{margin:0}}>

                                            <Col xs={24} lg={12} className="col-search-food">
                                                <Form.Item label="Tên khách hàng" name='name' className='form-item-admin-cart'  >
                                                    <Input  />
                                                </Form.Item>



                                            </Col>
                                            <Col xs={24} md={12}  className="col-search-food"> 
                                            <Form.Item label="Số điện thoại" name='phone' className='form-item-admin-cart'>
                                                <Input />
                                            </Form.Item></Col>
                                           

                                        </Row>
                                       <Row style={{marginBottom:'20px'}}>
                                       <Table
                                            className="table-food-admin"
                                            columns={columns}
                                                    pagination={false}
                                           

                                            dataSource={cart}
                                        />
                                       </Row>
                                        <Row>
                                        {cart.length!==0&&<>
                                         
                                         <Form.Item>
                                           <Button type="primary" htmlType='submit' style={{marginRight:'30px',borderRadius:'4px'}} size='large' >Xác nhận</Button>
                                         </Form.Item>
                                                <Button type='primary' onClick={()=>handleDeleteAllCart([])} size='large' >Hủy</Button></>}

                                        </Row>
                                         
                                    </Col>
                                </Row>
                            </Form>
                        </Col>

                    </Row>
                    <Row>

                    </Row>
                </Col>
                {isModalVisible === true ? (
          <UpdateItemCart
            isModal={isModalVisible}
            onUpdateToCart={onUpdatePrToCart}
           product={productCurrent}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        ) : (
          ""
        )}
    
            </Row>
          </TabPane>
          <TabPane tab="Đang chế biến" className='tab-processing'key="processing" >
           <InvoiceOffline key={key}/>
          </TabPane>
          <TabPane tab="Đã thanh toán"  key="transport">
         <InVoiceOfflineSuccess key={key}/>

          </TabPane>
         
        </Tabs>
           

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        litsFood: state.foodData.lists,
        cart: state.cartAdminData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        foodAct: bindActionCreators(foodAction, dispatch),
        onDeletePrToCart: (product) => {
            dispatch(removeToCart(product));
        },
        onUpdatePrToCart: (product, quantity, note) => {
            dispatch(updateToCart(product, quantity, note));
        },
        AddToCart: (product, quantity, note) => {
            dispatch(addToCart(product, quantity, note));
        },
        onDeleteAllToCart: (product) => {
            dispatch(deleteAllCart(product));
          },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
