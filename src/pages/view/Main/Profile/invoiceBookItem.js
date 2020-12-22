import { Button, Descriptions, notification, PageHeader, Row, Statistic, Tag } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_BASE_URL } from '../../../../constants';
import { addToCart, deleteAllCart, getNumbers, removeToCart, updateToCart } from '../../../../redux/Action/cartBookingAction';
import * as foodAction from '../../../../redux/Action/index';
import * as invoiceUserAction from '../../../../redux/Action/invoiceBookAction';
import EditItemInvoiceBook from './EditItemInvoiceBook';
import './index.css';


const InvoiceBookItem = ({invoice,products,onGetDataCart,onDeleteAllToCart,isModalVisible,showModal,handleOk,handleCancel,fetchInvoice,index}) => {
    const token = localStorage.getItem("accessToken");
    const cart = invoice.cartProduct.map((item,index)=>{
         
     return  { product:item.productInfo ,quantity:item.quantity,topping:item.toppingList,note:item.note}
    })
   
    const showModalEidt = () => {
       showModal()
        onGetDataCart(cart);
      
    };

    const handleOkEdit = () => {
        handleOk()
    };

    const handleCancelEdit = () => {
        onDeleteAllToCart([])
        handleCancel()
     
    };

    
    const showQuantity = (product)=>{
        var index=0
        if (product.length > 0) {
            for (var i = 0; i < product.length; i++) {
                index += product[i].quantity;
            }
            return index;
        }
    
    }
   const handleChoose=()=>{
    fetch(API_BASE_URL + `/order-by-date/set-default/${invoice.invoiceInfo.id}`, {
        method: "PUT",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }),
       
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.error) {
                throw res.error;
            }
            fetchInvoice()
            notification["success"]({
                message: "",
                duration: 2,
                description: "Chọn hóa đơn hàng ngày ",
            });
            handleCancelEdit()

            return res;
        })
        .catch((error) => { });
   }
 
    return (
        <div>
            {invoice.setDefault?
             <PageHeader style={{ border: '2px solid #00793F', borderRadius: '5px' }}
             title={`Đơn hàng `}
             tags={<Tag color="blue"></Tag>}

             extra={[
                 <Button key="2" style={{ background: 'rgb(255, 80, 80)' }} type='primary'onClick={showModalEidt}><b><b>Sửa</b></b>
                 </Button>,

                 <Button key="1" type="primary">
                     <b>Chọn</b>
                 </Button>,
             ]}
         >
             <Row>
                 <Descriptions size="small" column={1}>
                     <Descriptions.Item label="Danh sách món ăn">
                        {invoice.cartProduct.map((item,index)=>(
                            <>
                            <p>{item.productInfo.productName} x {item.quantity} </p>
                            </>
                        ))}
                       </Descriptions.Item>
                 </Descriptions>
                 <Statistic title="Số sản phẩm" value={showQuantity(invoice.cartProduct)} />


                 <Statistic
                     title="Chi phí"

                     value={invoice.invoiceInfo.amountTotal}
                     style={{
                         margin: '0 32px',
                        }}
                    />

                    </Row>
                  </PageHeader>
                  :
                  <PageHeader 
                  title={`Đơn hàng `}
                  tags={<Tag color="blue"></Tag>}

                  extra={[
                      <Button key="2" style={{ background: 'rgb(255, 80, 80)' }} type='primary' onClick={showModalEidt}><b><b>Sửa</b></b></Button>,

                      <Button key="1" type="primary" onClick={()=>handleChoose()}>
                          <b>Chọn</b>
                      </Button>,
                  ]}
              >
                  <Row>
                      <Descriptions size="small" column={1}>
                          <Descriptions.Item label="Danh sách món ăn">
                             {invoice.cartProduct.map((item,index)=>(
                                 <>
                                 <p>{item.productInfo.productName} x {item.quantity} </p>
                                 </>
                             ))}
                            </Descriptions.Item>
                      </Descriptions>
                      <Statistic title="Số sản phẩm" value={showQuantity(invoice.cartProduct)} />


                      <Statistic
                          title="Chi phí"

                          value={invoice.invoiceInfo.amountTotal}
                          style={{
                              margin: '0 32px',
                             }}
                         />

                         </Row>
                       </PageHeader>}
                       {isModalVisible?<EditItemInvoiceBook  isModalVisible={isModalVisible}  handleOk={handleOkEdit} handleCancel={handleCancelEdit} products={products} invoice={invoice} />:''}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        litsFood: state.foodData.lists,
        cart: state.cartAdminData,
        invoiceUser:state.invoiceUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        foodAct: bindActionCreators(foodAction, dispatch),
        invoiceAct:bindActionCreators(invoiceUserAction,dispatch),
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceBookItem);


