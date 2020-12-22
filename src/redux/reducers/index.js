import foodReducer from './foodReducer'
import  groupReducer from './group-food'
import cart from './cartReducer'
import userReducer from './userReducer';
import invoiceReducer from './invoiceReducer'
import topping from './toppingReducer';
import loginReducer from '../reducers/LoginReducer'
import signupreducer from './forgotPassReducer';
import menuReducer from './menuReducer';
import cartAdmin from './cartAdminReducer';
import invoiceUserReducer from './invoiceBookReducer'
import CartBook from './cartBookReducer';

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
    foodData: foodReducer,
    groupData:groupReducer,
    cartData:cart,
    userData: userReducer,
    invoiceData: invoiceReducer,
    toppingData:topping,
    loginData:loginReducer,
    forgotPass:signupreducer,
    menuData:menuReducer,
    cartAdminData:cartAdmin,
    invoiceUser:invoiceUserReducer,
    CartBookData: CartBook
});
export default rootReducer;