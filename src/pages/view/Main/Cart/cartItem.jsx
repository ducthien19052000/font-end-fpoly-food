import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, Col, Image, Row } from 'antd'
import React, { useState } from 'react'
import EditCart from './editCart'
import {EyeOutlined}  from '@ant-design/icons'

const CartItem = ({item,onHandleRemoveCart,onUpdatePrToCart}) => {
    const [isModal, setIsModal] = useState(false)
    const [itemEdit,setItemEdit] = useState({})
  
   if(item.lenght>0){
    var topping = item.topping.map(toping=>(toping.topping.name))
   }
      
    
    const handleOk = (e) => {
      setIsModal(false);
    };
    const handleCancel = (e) => {
      setIsModal(false);
    };
    const showModal = (item) => {
      setIsModal(true);
      setItemEdit(item)
    };
   
    return (
        <div>
            <Row>
                  <Col span={6} style={{ padding: "5px" }}>
                    <Image src={item.product.image} />
                  </Col>
                  <Col span={18}>
                    <Row style={{ margin: 0 }}>
                      <Col span={12}>
                        <Row style={{margin:0}}>
                        <span style={{ fontSize: 16, fontWeight: 500 }}>
                         {item.quantity}x  {item.product.productName}
                        </span>{" "}
                        </Row>
                       
                        <Row style={{ margin: 0 }}>
                              <span className='span-topping'>
                              {topping}
                            </span>

                        </Row>
                        <Row style={{ margin: 0 }}>
                        <span className='span-detail-item'  onClick={()=>showModal(item)}>
                       
                        </span>
                        </Row>
                      
                       
                      </Col>
                      <Col span={12}>
                        <Row style={{ margin: 0 }}>
                          <span style={{ fontSize: 16, fontWeight: 500 }}>
                            {item.product.price} đ/{item.product.unit}
                          </span>
                        </Row>
                        <Row style={{ margin: 0 }}>
                          <Button
                            onClick={()=>showModal(item)}
                            style={{ background: "none", border: "none" }}
                          >
                            {" "}
                            <EyeOutlined />
                          </Button>
                          <Button
                            onClick={() => onHandleRemoveCart(item.product,item.topping)}
                            style={{ background: "none", border: "none" }}
                          >
                            {" "}
                            <DeleteTwoTone />
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  {isModal?<EditCart visible={isModal} handleCancel={handleCancel} onUpdatePrToCart={onUpdatePrToCart} onHandleRemoveCart={onHandleRemoveCart} item={itemEdit}/>:''}
                
                </Row>
               
        </div>
    )
}

export default CartItem
