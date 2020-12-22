const { Action_Type } = require("../Action/loginAction");
const list = {
    lists: [],
    isloading: false,
    isError: ''
}
console.log(list);
const loginss = (state = list, action) => {
    switch (action.type) {
        case Action_Type.LOGIN: {
            console.log(action);
            return { ...state, isloading: true }
        }


        case Action_Type.LOGIN_SUCCESS: {
            
            return { ...state,isError: '' ,isloading: false } 
        }
        case Action_Type.LOGIN_ERROR: {
            
            return { ...state, isError: action.payload, isloading: false }
        }
        default:
            return { ...state }
    }
}
export default loginss;