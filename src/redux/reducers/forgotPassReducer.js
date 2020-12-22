const { Actionsignup } = require("../Action/forgotPasswordAction");

const signup = {
    list: [],
    issignup: false,
    forget: ''
}
const signupreducer = (state = signup, action) => {
    switch (action.type) {
        case Actionsignup.SIGN_UP: {
            return {
                ...state
            }
        }
        case Actionsignup.SIGN_UP_SUCCESS: {
            return {
                ...state,
                list: action.payload,
                issignup: true
            }
        }
        case Actionsignup.SIGN_UP_ERROR: {
            return {
                ...state
            }
        }
        case Actionsignup.FORGET: {
            return {
                ...state
            }
        }
        case Actionsignup.FORGET_SUCCESS: {
            return {
                ...state
            }
        }
        case Actionsignup.FORGET_ERROR: {
            return {
                ...state
            }
        }
        default:
            return {
                ...state
            }
    }
}
export default signupreducer;