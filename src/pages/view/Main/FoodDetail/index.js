import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  Input,
  List,
  notification,
  Row,
  Table
} from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../../constants";
import { addToCart, updateToCart } from "../../../../redux/Action/cartAction";
import {
  addToping,
  deleteAllCart,
  removeToCart
} from "../../../../redux/Action/toppinngAction";
import Cart from "../Cart";
import ProductItem from "../Product/ProductItem";
import "./index.css";

const FoodDetail = ({
  cart,
  AddToCart,
  AddToTopping,
  topping,
  DeleteToTopping,
  DeleteAllTopping,
  onUpdateToCart
}) => {
  const id = useParams().id;
  const [foodDetail, setFoodDetail] = useState({});
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState([]);
  const [idCate, setIdCate] = useState();

  const [showTopping, setShowTopping] = useState(false);

const [valueInput,setValueInput]= useState({quantity:1,note:''});

  const showDrawer = () => {
    setVisible(true);
  };
  const handleAddTopping = (toping) => {
  
    AddToTopping(toping);
  };

  const onClose = () => {
    setVisible(false);
  };
  const  findTopping=(cart,product)=>{
    var index =-1;
    if(cart.length>0){
        for(var i=0;i<cart.length;i++){
            if(cart[i].topping.id===product.id){
                index=i;
                break;
            }
        }
    }
    return index;

}
  const  findProductCart=(cart,product,topping)=>{
    var index =-1;
    if(cart.length>0){
        for(var i=0;i<cart.length;i++){
            if(cart[i].product.id===product.id){
              console.log(cart[i].topping)
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

  useEffect(() => {
    fetch(API_BASE_URL+`/product/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "*/*",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setFoodDetail(response.body);
       
        if (response.body.toppingList.length !== 0) {
          setShowTopping(true);
    
        }
        if(response.body.toppingList.length===0){
          setShowTopping(false)
        }
        DeleteAllTopping([])
        setIdCate(response.body.categoryEntity.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id,DeleteAllTopping]);

  useEffect(() => {
    fetch(
      API_BASE_URL+`/product/?productName=&status=&categoryId=1&size=4&page=0`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "*/*",
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setProduct(response.body.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idCate]);

  //showTotalCart
  const showQuantity = (cart) => {
    var quantity = 0;
    if (cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        quantity += cart[i].quantity;
      }
      return quantity;
    }
  };
  const onHandleChange = (e) => {
    const { name } = e.target;
    
    
    setValueInput({...valueInput,[name]:e.target.value})
    // console.log("changed", value);
  };
  //addtopping
  const handleAddToppingg=(topping)=>{
    const price = foodDetail.price + topping.price;
    handleAddTopping(topping);
    setFoodDetail({ ...foodDetail, price });
  }
  const handleDeleteToppingg=(topping)=>{
    DeleteToTopping(topping);   
    const price = foodDetail.price - topping.price;
    setFoodDetail({ ...foodDetail, price });
  }

  const onAddToCart = (product, quantity, topping,note) => {


    if (quantity !== 0) {
      var index =findProductCart(cart,product,topping)
      if(index!==-1){
        onUpdateToCart(product,quantity,topping,note)
        notification["success"]({
          message: "",
          duration: 2,
          description: "Cập nhật giỏ hàng thành công",
        });
   
      }
        if(index===-1){
          AddToCart(product, quantity,topping, note); 
          notification["success"]({
            message: "",
            duration: 2,
            description: "Thêm giỏ hàng thành công",
          });
    
        }
      

    } else {
      notification["warning"]({
        message: "",
        duration: 2,
        description: "Vui lòng chọn số lượng",
      });
    }
  };



  const columns = [
   
    {
      title: "Tên ",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (text) => <span>{text} đ</span>,
    },
    {
      title: "",
      dataIndex: "",
      render: (record) => {
        const index = findTopping(topping,record)
       if(index!==-1){
        
        return  <Button onClick={()=>handleDeleteToppingg(record)} type='primary'>Bỏ</Button>
        
       }
       else{
        return  <Button onClick={()=>handleAddToppingg(record)} type='primary'>Thêm</Button>
       }
      }
      

      ,
    },
  ];
 
 

  return (
    <>
      <Row
        className="row-food-detail-container"
        justify="center"
        style={{ marginTop: "30px" }}
      >
        <Badge count={showQuantity(cart)} id="myBtn" overflowCount={10}>
          <Button
            shape="circle"
            style={{ background: "none", border: "none" }}
            onClick={showDrawer}
          >
            {" "}
            <ShoppingCartOutlined
              style={{ fontSize: "30px", color: "#fff", margin: 0 }}
            />
          </Button>
        </Badge>
        <Col span={21}>
       

          <Row>
            <Col xs={24} md={8} className="col-img-food-detail">
              <div
                className="imageDetailItem"
                style={{ backgroundImage: `url(${foodDetail.image})` }}
              ></div>
              <div className="itemDetailImgListWrapped">
                <img className="itemDetailImg" src={foodDetail.image} />
                <img className="itemDetailImg" src={foodDetail.image} />
                <img className="itemDetailImg" src={foodDetail.image} />
                <img className="itemDetailImg" src={foodDetail.image} />
              </div>
            </Col>
            <Col xs={24} md={9} className="colInfoDetailItem">
              <div className="itemDetailInfo">
                <span className="span-name-shop">Món ngón Fpoly</span>
                <span className="span-name-food-detail">
                  {" "}
                  - {foodDetail.productName}{" "}
                </span>
              </div>
              <h2 className="nameDetailItem"> {foodDetail.productName}</h2>
            
              <p>
                <strong>{foodDetail.productName}</strong>{" "}
                {foodDetail.description}
              </p>

              <>
                {showTopping ? (
                  <Row className="tableTopping">
                    <Col span={24}>
                      <Table
                     
                        columns={columns}
                        dataSource={foodDetail.toppingList}
                        pagination={false}
                        scroll={{ y: 200 }}
                      z
                      />
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </>
            </Col>
            <Col xs={24} md={7} className="colCartDetailItem">
              <div className="itemDetailCartQuantity">
                <div style={{ marginTop: "10px" }}>
                  <Row type="flex" className="rowCartChangeQuantity">
                    <Col span={12} style={{ textAlign: "left" }}>
                      <span className="span-id-food">Số lượng</span>
                    </Col>
                    <Col span={12} style={{ textAlign: "end" }}>
                      <span className="spanShowQuantity">
                        <Input
                          className="inputShowQuantity"
                          inputMode="numeric"
                          value={valueInput.quantity}
                          pattern="[0-9]*"
                          type="number"
                          name='quantity'
                          min={1}
                          max={99}
                          // value={quantity}
                          onChange={onHandleChange}
                        />
                      </span>
                    </Col>
                  </Row>
                  <Row className="ant-row rowCartChangeQuantity">
                    {topping.length !== 0 && (
                      <>
                      
                          <Col span={12}>
                            <span className="spanPriceDetailItem">
                              Order thêm
                            </span>
                          </Col>
                          <Col
                            span={12}
                            style={{ textAlign: "end", paddingRight: "10px" }}
                          >
                            {" "}
                            <List
                            style={{textAlign:'center'}}
                              size="small"
                              bordered
                              dataSource={topping}
                              renderItem={(item) => (
                                <List.Item>{item.topping.name} </List.Item>
                              )}
                            />
                          </Col>
                      
                      </>
                    )}
                  </Row>
                  <div style={{ margin: "20px 0" }}>
                    <Row>
                      <Col span={12}>
                        <span className="spanPriceDetailItem"> Giá:</span>
                      </Col>
                      <Col
                        span={12}
                        style={{ textAlign: "end", paddingRight: "10px" }}
                      >
                        <span className="spanPriceDetailItem">
                          {foodDetail.price} đ/{foodDetail.unit}
                        </span>
                      </Col>
                    </Row>
                  </div>
                  <Row style={{margin:'20px 0'}}>
                <Col xs={24} md={5} className='spanTitleNoteAdmin'>
                <span>Ghi chú</span>
                </Col>
                <Col xs={24} md={19}>
                <Input size='large' name='note' value={valueInput.note}  onChange={onHandleChange}/>
                </Col>
            </Row>
                  <Row className="cart__button">
                    <span
                      className="btn__label"
                      onClick={() => onAddToCart(foodDetail, valueInput.quantity, topping,valueInput.note)}
                    >
                      Đặt món
                    </span>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row style={{ marginLeft: "25px" }}>
                <Col flex={4}>
                  <h4 style={{ fontSize: "36px" }}>Gợi ý món ăn</h4>
                </Col>
                <Col flex={1} style={{ textAlign: "right" }}>
                  {" "}
                </Col>
              </Row>
              <Row style={{ margin: 0 }}>
                {product.map((food, index) => (
                  <ProductItem
                    product={food}
                    key={index}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
        <Cart visible={visible} onClose={onClose} />
      </Row>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cartData,
    topping: state.toppingData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    AddToCart: (product, quantity, topping,note) => {
      dispatch(addToCart(product, quantity, topping,note));
    },
    AddToTopping: (topping) => {
      dispatch(addToping(topping));
    },
    DeleteToTopping: (topping) => {
      dispatch(removeToCart(topping));
    },
    DeleteAllTopping: (topping) => {
      dispatch(deleteAllCart(topping));
    },
    onUpdateToCart: (product, quantity, topping,note) => {
      dispatch(updateToCart(product, quantity, topping,note));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetail);
