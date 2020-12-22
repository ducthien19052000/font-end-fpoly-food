import { Col, Input, notification, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { connect } from "react-redux";
import { addToCart, deleteAllCart, updateToCart } from "../../../../redux/Action/cartAdminAction";

const UpdateItemCart = ({isModal,handleOk,handleCancel,product,onUpdateToCart}) => {
    const [valueInput,setValueInput]= useState({quantity:product.quantity,note:product.note});
    
  

  const handleAddToCart = (product, quantity, note) => {
   
    onUpdateToCart(product, quantity, note); 
    notification["success"]({
      message: "",
      duration: 2,
      description: "Cập nhật giỏ hàng thành công",
    });
    handleCancel();

};
const onHandleChange = (e) => {
    const { name, value } = e.target;
    // setQuantity(value);
    setValueInput({...valueInput,[name]:e.target.value})

  };
 

    return (
        <div>
                   
      <Modal
        title="Thêm giỏ hàng"
        visible={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
          
        <div
          className="itemDetailCartQuantity"
          style={{ marginTop: 0, paddingTop: 0 }}
        >
          <div>
            <Row className="rowImageEditCart">
              <Col xs={24} md={16} style={{ height: "100px" }}>
                <span>
                  <img src={product.product.image} style={{ height: "100%" }} />
                </span>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ margin: "10px 0", textAlign: "center" }}>
                  <span className="spanPriceDetailItem">
                    <Input
                      className="inputShowQuantity"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      type="number"
                      name='quantity'
                      min={0}
                      max={99}
                      value={valueInput.quantity}
                      onChange={onHandleChange}
                    />
                  </span>
                </div>
                <span className="spanShowQuantity">
                  Giá: {product.product.price} đ/{product.unit}
                </span>
              </Col>
            </Row>
            <Row style={{margin:'20px 0'}}>
                <Col xs={24} md={5} className='spanTitleNoteAdmin'>
                <span>Ghi chú</span>
                </Col>
                <Col xs={24} md={19}>
                <Input size='large' name='note' value={valueInput.note}  onChange={onHandleChange}/>
                </Col>
            </Row>
        
           
          
            {valueInput.quantity > 0 && (
              <Row className="cart__button">
                <span
                  className="btn__label"
                  onClick={() =>
                    handleAddToCart(product.product, Number(valueInput.quantity),valueInput.note )
                  }
                >
                  Cập nhật giỏ hàng
                </span>
              </Row>
            )}
       
          </div>
        </div>
      </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    
      cart: state.cartAdminData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      

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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItemCart);

