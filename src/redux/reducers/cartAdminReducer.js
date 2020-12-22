import {ActionTypeCart} from '../Action/cartAdminAction'

var data = JSON.parse(localStorage.getItem('CARTADMIN'));
const listCart = data?data:[];

const cartAdmin =(state=listCart,action)=>{
    var {product,quantity,note}=action;
    var index =-1;
    switch(action.type){
        case ActionTypeCart.ADD_PRODUCT_CART_ADMIN:
            
            index = findProductCart(state,product);
           if(index!==-1){
               state[index].quantity+=quantity;
               state[index].note=note;

           }
           else{
            state.push({
                product,quantity,note
            });
           }
           localStorage.setItem('CARTADMIN',JSON.stringify(state));
            return [...state];
        case ActionTypeCart.DELETE_PRODUCT_CART_ADMIN:
            index = findProductCart(state,product);
            if(index!==-1){
                state.splice(index,1);
            }
            localStorage.setItem('CARTADMIN',JSON.stringify(state));
           
            return [...state];
            case ActionTypeCart.UPDATE_PRODUCT_CART_ADMIN:
               
                index = findProductCart(state,product);
                if(index!==-1){
                    state[index].quantity=quantity;
                    state[index].note=note

                }
            localStorage.setItem('CARTADMIN',JSON.stringify(state));
            return [...state];
        case ActionTypeCart.DELETE_ALL_CART_ADMIN:
            state=product;
            localStorage.setItem('CARTADMIN',JSON.stringify(state))
            return [...state]
            default : return [...state];
    }
}

const  findProductCart=(cart,product)=>{
    var index =-1;
    if(cart.length>0){
        for(var i=0;i<cart.length;i++){
            if(cart[i].product.id===product.id){                       
                index=i
                break
                
            }
        }
    }
    return index;

}


export default  cartAdmin;