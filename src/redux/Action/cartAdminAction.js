export const ActionTypeCart = {
    ADD_PRODUCT_CART_ADMIN :'ADD_PRODUCT_CART_ADMIN',
    DELETE_PRODUCT_CART_ADMIN : 'DELETE_PRODUCT_CART_ADMIN',
    GET_NUMBERS_BASKET_ADMIN :'GET_NUMBERS_BASKET_ADMIN',
    UPDATE_PRODUCT_CART_ADMIN:'UPDATE_PRODUCT_CART_ADMIN',
    DELETE_ALL_CART_ADMIN:'DELETE_ALL_CART_ADMIN'
}

export const addCart = (productName)=>{
    return (dispatch) =>{
        JSON.parse( localStorage.setItem('cartadmin',productName));
        dispatch({
            type:ActionTypeCart.ADD_PRODUCT_CART_ADMIN,
            payload: productName
        });
    }
}

export const getNumbers=()=>{
    return (dispatch) =>{
        dispatch({
            type:ActionTypeCart.GET_NUMBERS_BASKET_ADMIN
        });
    }
}
export const addToCart=(product,quantity,note)=>{
    return{
        type: ActionTypeCart.ADD_PRODUCT_CART_ADMIN,
        product,
        quantity,
        note
    }
}
export const removeToCart=(product)=>{
        return{
            type: ActionTypeCart.DELETE_PRODUCT_CART_ADMIN,
            product
        
        }

}

export const updateToCart=(product,quantity,note)=>{
    return{
        type:ActionTypeCart.UPDATE_PRODUCT_CART_ADMIN,
        product,
        quantity,
        note
    }
}
export const deleteAllCart=(product)=>{
    return{
        type:ActionTypeCart.DELETE_ALL_CART_ADMIN,
        product
        
    }
}
