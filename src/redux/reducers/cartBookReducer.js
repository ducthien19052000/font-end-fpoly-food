import {ActionTypeCart} from '../Action/cartBookingAction'


const listCart = [];

const CartBook =(state=listCart,action)=>{
    var {product,quantity,topping,note}=action;
    var index =-1;
    switch(action.type){
        case ActionTypeCart.GET_DATA_BOOK:
            
            state=action.payload
            return [...state];
        case ActionTypeCart.ADD_PRODUCT_CART_BOOK:
            
            index = findProductCart(state,product,topping);
           if(index!==-1){
               state[index].quantity+=quantity;
           }
           else{
            state.push({
                product,quantity,topping,note
            });
           }
           ;
            return [...state];
        case ActionTypeCart.DELETE_PRODUCT_CART_BOOK:
            index = findProductCart(state,product,topping);
            if(index!==-1){
                state.splice(index,1);
            }
            ;
           
            return [...state];
            case ActionTypeCart.UPDATE_PRODUCT_CART_BOOK:
                
                index = findProductCart(state,product,topping);
                if(index!==-1){
                    state[index].quantity=quantity;
                    state[index].note=note

                }
            ;
            return [...state];
        case ActionTypeCart.DELETE_ALL_CART_BOOK:
            state=product;
            
            return [...state]
            default : return [...state];
    }
}

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

export default  CartBook;