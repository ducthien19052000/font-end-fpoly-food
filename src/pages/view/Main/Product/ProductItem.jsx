import { Col, Input, notification, Row, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../../../../components/Loading";
import { addToCart, removeToCart, updateToCart } from "../../../../redux/Action/cartAction";

function ProductItem({ product,onAddToCart,cart,onUpdateToCart }) {
  
  let history = useHistory();
  const showDetail=()=>{
      history.push(`/food/${product.id}`)
    
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
   
    const topping=[]
  const [valueInput,setValueInput]= useState({quantity:1,note:''});
    
  const  findProductCart=(cart,product,topping)=>{
    var index =-1;
    if(cart.length>0){
        for(var i=0;i<cart.length;i++){
            if(cart[i].product.id===product.id){
            
                const check =equar(cart[i].topping,topping)
            if(check){
                index=i
                break
            }     
            }
        }
    }
    return index;

}
function equar(a, b) {
 
    if (a.length !== b.length) {
      return false
  } else {
      for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
              return false
          }
      }
      return true;
  }
   
   
}
    const onHandleChange = (e) => {
        const { name, value } = e.target;
        // setQuantity(value);
        setValueInput({...valueInput,[name]:e.target.value})
     

      };

    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
        setValueInput({quantity:1,note:''})
      setIsModalVisible(false);
    };
    
  const showDetailCart=()=>{
   var index =findProductCart(cart,product,[])
  
    if(index!==-1){
      const quantity=cart[index].quantity
      const note = cart[index].note
      setValueInput({...valueInput,quantity,note})
     
    }
    setIsModalVisible(true);
    
  }
  
  const handleAddToCart = (product, quantity,topping, note) => {
    var index =findProductCart(cart,product,topping)
    if(index!==-1){
      onUpdateToCart(product,quantity,topping,note)
      notification["success"]({
        message: "",
        duration: 2,
        description: "Cập nhật giỏ hàng thành công",
      });
      handleCancel();
    }
      if(index===-1){
        onAddToCart(product, quantity,topping, note); 
        notification["success"]({
          message: "",
          duration: 2,
          description: "Thêm giỏ hàng thành công",
        });
        handleCancel();
      }
    
  };

  if(product==={}){
    return <Spin/>
  }
 
  return (
    <>
   
    
     <Col
     
        xs={24}
        lg={6}
        className="col-product-item"
      
      >
        <div className="product-item-wrap">
          <Row  onClick={showDetail}
            className="row-header-product-item"
            style={{ backgroundImage: `url(${product.image})`, margin: 0 }}
          >
            {/* <Image src={product.image} /> */}
          </Row>
          <Row className="row-bot-product-item" style={{ margin: 0 }} >
            <span className="span-product-name-item"  onClick={showDetail}>
              {product.productName}
            </span>
            <span className='span-product-item-price'  onClick={showDetail}>{product.price} đ</span>
            <span
              className="add-to-cart"
              onClick={() => showDetailCart()}
            >
              {" "}
              <FaCartPlus size={30} style={{color:'#ed7100'}} />
            </span>
          </Row>
        </div>
        <Modal
        title="Thêm giỏ hàng"
        visible={isModalVisible}
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
                  <img src={product.image} style={{ height: "100%" }} />
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
                  Giá: {product.price} đ/{product.unit}
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
                    handleAddToCart(product, Number(valueInput.quantity),topping,valueInput.note )
                  }
                >
                  Thêm giỏ hàng
                </span>
              </Row>
            )}
       
          </div>
        </div>
      </Modal>
      </Col>

    </>
  );
}
const  mapStateToProps= state =>{
  // console.log(state.foodData.lists)
  return {
  
      cart :state.cartData
      
  }
}

const mapDispatchToProps = dispatch=>{
  return{
     

     
    onAddToCart: (product, quantity,topping,note) => {
    dispatch(addToCart(product, quantity,topping,note));
  },
  onDeletePrToCart:(product,topping)=>{
    dispatch(removeToCart(product,topping))
  },
  onUpdateToCart: (product, quantity, topping,note) => {
    dispatch(updateToCart(product, quantity, topping,note));
  },
  }
  
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductItem)

