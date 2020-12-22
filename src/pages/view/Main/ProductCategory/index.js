import { ShoppingCartOutlined } from '@ant-design/icons'
import { Col, Pagination, Row, Select, Spin } from 'antd'
import Search from 'antd/lib/input/Search'
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { API_BASE_URL } from '../../../../constants'
import { addToCart, removeToCart, updateToCart } from '../../../../redux/Action/cartAction'
import * as categoryAction from '../../../../redux/Action/categoryAction'
import * as foodAction from '../../../../redux/Action/index'
import CartItem from '../Cart/cartItem'
import ProductItem from '../Product/ProductItem'
import './index.css'

const { Option } = Select;

const Category = ({foodAct,categoryAct,litsFoot,listGroup,cart,AddToCart,onDeletePrToCart,onUpdatePrToCart}) => {
        let {id} = useParams();
        const [current,setCurrent] = useState(1)
        const [currentCateFood,setCurrentCateFood] = useState([])
        const [nameCate,setNameCate] = useState('')
        const page = current-1;
        let history = useHistory()
      const fetchCategory= useCallback(
        () => {
            const { getDataCategory } = categoryAct;
            getDataCategory();
        },
        [categoryAct],
    )

    const onHandleRemoveCart = (product,topping) => {
      onDeletePrToCart(product,topping);
    };
    const handleChange= (value)=>{
      history.push(`/category/${value}`)
   }

    useEffect(()=>{
      fetch(API_BASE_URL+`/product/?productName=&status=&categoryId=${id}&size=10&page=0`, {
    "method": "GET",
    "headers": new Headers({
      'Content-Type' : 'application/json',
      "Access-Control-Allow-Origin": "*"
  })
  })
  .then(response => response.json())
  .then(response => {
     
      setCurrentCateFood(response.body.content)
  })
  .catch(err => { console.log(err); 
  });
     
    },[id])
    const onChange = page=>{
     
        setCurrent(page)
   
    } 
    useEffect(() => {
    
        fetchCategory();
      }, [fetchCategory]);
  
        const fetchFood= useCallback(
            () => {
                
                const { getDataGroup } = foodAct;
          
                getDataGroup(id,page)
            
            },
            [id,foodAct,page],
        )
        
        useEffect(() => {
           
                fetchFood()
           
            
          }, [fetchFood]);
          
          useEffect(()=>{
      
            fetch(API_BASE_URL+`/category/${id}`)
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    throw(res.error);
                }
              
                setNameCate(res.body.categoryName)
                
                return res;
            })
            .catch(error => {
               
            })
          },[id])

          const showTotal = (ct) => {
            var total = 0;
            if (ct.length > 0) {
              for (var i = 0; i < ct.length; i++) {
                total += ct[i].product.price * ct[i].quantity;
              }
              return total;
            }
          };
          const onSearch = (value) => history.push(`/search/${value}`);
     
       if(nameCate===''){
           return <Spin/>
       }
   
    
  else{
    return (
        <>
            <Row className="container-main-product">
        <Col span={22} style={{ margin: "0 auto" }}>
          <Row className="content-food">
            <h2>Menu của nhà hàng</h2>
          </Row>
          <Row style={{ background: "#eeeeee" }}>
            <Col span={8}>
              <Row style={{ margin: "20px" }}>
                <Col span={18} push={6}>
                  <Select value={nameCate} style={{ width: 120 }}  onChange={handleChange}>
                    {listGroup.map((category, index) => (
                      <Option value={category.categoryName} key={index} >
                          <Link to={`/category/${category.id}`}>
                          {category.categoryName}
                          </Link>   
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={6} pull={18}>
                  Danh mục
                </Col>
              </Row>
            </Col>
            <Col span={8} offset={8}>
              <Row style={{ margin: "20px" }}>
                <Col span={16} offset={8}>
                  <Col>
                  <Search
                      placeholder="Tìm món ăn"
                      enterButton
                      onSearch={onSearch}
                    />
                  </Col>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={18} className="menu-food-col">
            <Row className="row-food-all" style={{ margin: '0 0 20px 0' }}>
      <Col span={24}>
        <Row style={{ margin:'0' }}>
            {litsFoot.length===0&& <span>Không có sản phẩm</span>}
         
          {litsFoot.map((item,index)=>(
           <ProductItem product={item} key={index} onAddToCart={AddToCart} cart={cart} onUpdateToCart={onUpdatePrToCart}/>
          ))} 
      
          
         </Row>
         <Row>
         <Pagination current={current} onChange={onChange} total={currentCateFood.length}  pageSize={4}  />
         </Row>
      </Col>
    </Row>
           
              
            </Col>
            <Col span={6}>
              <Row className="row-show-cart" style={{ margin: 0 }}>
                <Col span={24}>
                  <div
                    style={{
                      position: "absolute",
                      top: "-44px",
                      right: "0px",
                      backgroundColor: "rgb(235, 113, 0)",
                      borderRadius: "50px",
                      width: "80px",
                      height: "80px",
                      border: "12px solid white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ShoppingCartOutlined />
                  </div>
                  <Row className="cart__header">
                    <span>Số món</span>
                  </Row>
                  <Row>
                    {cart.map((item, index) => (
                      <CartItem
                        item={item}
                        key={index}
                        onHandleRemoveCart={onHandleRemoveCart}
                        onUpdatePrToCart={onUpdatePrToCart}
                      />
                    ))}
                  </Row>
                  <Row className="row-price-cart">
                    <span className="cart__price-total">Tổng giá</span>

                    <span className="cart__price-total" span={16}>
                        
                      {showTotal(cart)} đ
                    </span>
                  </Row>
                  {cart.length>0&&<Row className="cart__button">
                  <Link to="/checkout" className="btn__label">
                  Tiến hành đặt hàng
                </Link>
                  </Row>}
                </Col>
              </Row>
            </Col>
          </Row>
          
        </Col>
      </Row>
          
        </>
    )
  }
}

const  mapStateToProps= state =>{
    return {
        
        litsFoot: state.foodData.lists,
        listGroup:state.groupData.lists,
        cart :state.cartData
        
    }
  }
  
  const mapDispatchToProps = dispatch=>{
    return{
        foodAct: bindActionCreators(foodAction,dispatch),
        categoryAct: bindActionCreators(categoryAction,dispatch),

        AddToCart: (product, quantity, topping) => {
          dispatch(addToCart(product, quantity, topping));
        },
          onDeletePrToCart:(product,topping)=>{
            dispatch(removeToCart(product,topping))
          },
          onUpdatePrToCart: (product, quantity, topping) => {
            dispatch(updateToCart(product, quantity, topping));
          },
     
    }
    
  }
export default connect(mapStateToProps,mapDispatchToProps)(Category)
