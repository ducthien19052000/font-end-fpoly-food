export const ActionTypeCart = {
   
   
    GET_ID_DATA :'GET_ID_DATA',
    
    DELETE_ALL_ID:'DELETE_ALL_ID'
}



export const getId=(data)=>{
    return {
       
            type:ActionTypeCart.GET_ID_DATA,
            payload:data
        
    }
}

export const deleteAllId=(product)=>{
    return{
        type:ActionTypeCart.DELETE_ALL_ID,
        product
        
    }
}
