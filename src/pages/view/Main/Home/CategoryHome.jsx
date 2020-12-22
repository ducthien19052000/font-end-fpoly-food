import { Button, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../../../../constants'
import ProductItemHome from './ProductItemHome'

const CategoryHome = ({newProduct, onAddToCart,cart,onUpdateToCart}) => {
  const [product,setProduct] = useState([])
  useEffect(() => {
    fetch(
      API_BASE_URL+`/menu/${newProduct.id}?page=0&size=6`
     
    )
      .then((response) => response.json())
      .then((response) => {
        
        setProduct(response.body.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newProduct.id]);
  if(product.length===0){
    return <></>
  }
  else{
    return (
      <div className="site-layout-background-main-home">
           <Row style={{ marginLeft: "35px",marginTop:'20px' }}>
            <Row style={{ width: "100%", display: "block" }}>
            <h2 style={{ float: "left" }}>{newProduct.name}</h2>
            <Link  to="/product">
            <Button
               
                type="button"
                className="ant-btn ant-btn-dashed"
                style={{
                  float: "right",
                  marginRight: "30px",
                  background: "#ed7100",
                }}
                size='large'
              >
                <span className='spanChiTietHome'>Xem chi tiết</span>
              </Button>
            </Link>
            
            </Row>
            <Row className="row-food-home">
              {product.map((food, index) => (
                <ProductItemHome
                  product={food}
                  cart={cart}
                  onUpdateToCart={onUpdateToCart}
                  key={index}
                  onAddToCart={onAddToCart}
                />
              ))}
            </Row>

           

           
          </Row>
      </div>
  )
  }
}

CategoryHome.propTypes = {

}

export default CategoryHome
