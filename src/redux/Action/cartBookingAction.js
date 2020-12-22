export const ActionTypeCart = {
    ADD_PRODUCT_CART_BOOK :'ADD_PRODUCT_CART_BOOK',
    DELETE_PRODUCT_CART_BOOK : 'DELETE_PRODUCT_CART_BOOK',
    GET_DATA_BOOK :'GET_DATA_BOOK',
    UPDATE_PRODUCT_CART_BOOK:'UPDATE_PRODUCT_CART_BOOK',
    DELETE_ALL_CART_BOOK:'DELETE_ALL_CART_BOOK'
}

export const addCart = (productName)=>{
    return (dispatch) =>{
        JSON.parse( localStorage.setItem('cart',productName));
        dispatch({
            type:ActionTypeCart.ADD_PRODUCT_CART_BOOK,
            payload: productName
        });
    }
}

export const getNumbers=(data)=>{
    return {
       
            type:ActionTypeCart.GET_DATA_BOOK,
            payload:data
        
    }
}
export const addToCart=(product,quantity,topping,note)=>{
    return{
        type: ActionTypeCart.ADD_PRODUCT_CART_BOOK,
        product,
        quantity,
        topping,note
    }
}
export const removeToCart=(product,topping)=>{
        return{
            type: ActionTypeCart.DELETE_PRODUCT_CART_BOOK,
            product,topping
        
        }

}

export const updateToCart=(product,quantity,topping,note)=>{
    return{
        type:ActionTypeCart.UPDATE_PRODUCT_CART_BOOK,
        product,
        quantity,
        topping,note
    }
}
export const deleteAllCart=(product)=>{
    return{
        type:ActionTypeCart.DELETE_ALL_CART_BOOK,
        product
        
    }
}
