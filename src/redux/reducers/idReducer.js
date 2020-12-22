import {ActionTypeCart} from '../Action/idAction'


const listCart = [];

const Id =(state=listCart,action)=>{
    var {product,quantity,topping,note}=action;
    var index =-1;
    switch(action.type){
        case ActionTypeCart.GET_ID_DATA:
            state=action.payload
            return [...state];
            case ActionTypeCart.DELETE_ALL_ID:
                state=product;
                
                return [...state]
            default : return [...state];
    }
}



export default Id;