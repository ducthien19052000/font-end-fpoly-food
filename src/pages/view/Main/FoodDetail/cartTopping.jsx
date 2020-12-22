import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox } from 'antd'

const CartTopping = ({handleAddTopping,record,onChange,checked}) => {
        const [checkedd,setChecked]= useState(checked)

    // const onChange = (e, topping) => {
    //     console.log(e.target.checked,topping)
    //     if (e.target.checked) {
    //       const price = foodDetail.price + topping.price;
    //       handleAddTopping(topping);
    //       setFoodDetail({ ...foodDetail, price });
    //     }
    //     if (e.target.checked === false) {
    //       DeleteToTopping(topping);
    //       const price = foodDetail.price - topping.price;
    
    //       setFoodDetail({ ...foodDetail, price });
    //     }
    //   };

    return (
        <div>
                   {/* <CartTopping checked={checked} onChange={onChange}/> */}
              {/* <Checkbox onChange={(e) => onChange(e, record)} checked={checked} defaultChecked={false}></Checkbox> */}
        </div>
    )
}

CartTopping.propTypes = {

}

export default CartTopping
