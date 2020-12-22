import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../../constants';

const ListProduct = ({id}) => {
    const [product,setProduct] = useState([])
 useEffect(()=>{
    fetch(API_BASE_URL + `/invoice/details/${id}`)
    .then((res) => res.json())
    .then((res) => {
        if (res.error) {
            throw res.error;
        }
        setProduct(res.body.cartProduct.map(item=>{
              return {name:item.productInfo.productName,quantity:item.quantity}
          }))

        return res;
    })
    .catch((error) => { });

 },[id])
        
      console.log(product)
      
     
    return (
        <div>
           {product.map((item,index)=>(
               <span key={index}> x{item.quantity}{item.name} </span>
           ))} 
        </div>
    )
}

export default ListProduct
