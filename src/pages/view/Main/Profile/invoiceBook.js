import { Button, Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, deleteAllCart, removeToCart, updateToCart } from '../../../../redux/Action/cartAction';
import * as foodAction from '../../../../redux/Action/index';
import * as invoiceUserAction from '../../../../redux/Action/invoiceBookAction';
import AddInvoiceBook from './addItemInvoiceBook';
import './index.css';
import InvoiceBookItem from './invoiceBookItem';


const InvoiceBook = ({ foodAct, invoiceAct,cart,user, onDeletePrToCart, litsFood, onDeleteAllToCart,invoiceUser }) => {
   
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    
    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModalEdit = () => {
        setIsModalVisibleEdit(true);
    };

    const handleOkEdit = () => {
        setIsModalVisibleEdit(false);
    };

    const handleCancelEdit = () => {
        onDeleteAllToCart([])
        setIsModalVisibleEdit(false);
    };


    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        onDeleteAllToCart([])
        setIsModalVisible(false);
    };

    
   const [count,setCount] = useState(0)
    
    const fetchEmployee = useCallback(() => {
        const { getData } = foodAct;


        getData();
    }, [foodAct]);
  
    useEffect(() => {
        fetchEmployee();
    }, [fetchEmployee]);
    const fetchInvoice = useCallback(() => {
        const { getDataBookUser } = invoiceAct;

        getDataBookUser(user.email);
    }, [invoiceAct,user.email]);
  
    useEffect(() => {
        fetchInvoice();
    }, [fetchInvoice,isModalVisible,isModalVisibleEdit]);
   


   
    return (
        <div>
            <Row>
                <Col xs={24}>

                {invoiceUser.length>0?
                  invoiceUser.map((item,index)=>(
                    <InvoiceBookItem products={litsFood} invoice={item} key={index} fetchInvoice={fetchInvoice} isModalVisible={isModalVisibleEdit} handleCancel={handleCancelEdit} handleOk={handleOk} showModal={showModalEdit}/> 
               ))
               :''
                
             }
                   
             {count<5&&<Row style={{ justifyContent: 'space-between', margin: '30px 0' }}>
                        <Col span={10}>
                        </Col>
                        <Col span={4}>
                            <Button type='primary' size='large' onClick={showModal}>
                                Thêm
                          </Button>
                        </Col>
                        <Col span={10}>
                        </Col>
                    </Row>}

                    
                   {isModalVisible?<AddInvoiceBook user={user} isModalVisible={isModalVisible}  handleOk={handleOk} handleCancel={handleCancel} products={litsFood}  />:''}
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        litsFood: state.foodData.lists,
        cart: state.cartAdminData,
        invoiceUser:state.invoiceUser.lists
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        foodAct: bindActionCreators(foodAction, dispatch),
        invoiceAct:bindActionCreators(invoiceUserAction,dispatch),
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceBook);


