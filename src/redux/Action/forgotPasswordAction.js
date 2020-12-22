export const Actionsignup = {
    SIGN_UP: 'SIGN_UP',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_ERROR: 'SIGN_UP_ERROR',

    FORGET: 'FORGET',
    FORGET_SUCCESS: 'FORGET_SUCCESS',
    FORGET_ERROR: 'FORGET_ERROR'
}
export const signup = (list) => {
    return {
        type: Actionsignup.SIGN_UP,
        payload: list
    }
}

export const signupsuccess = (list) => {
    return {
        type: Actionsignup.SIGN_UP_SUCCESS,
        payload: list
    }
}

export const signuperror = (list) => {
    return {
        type: Actionsignup.SIGN_UP_ERROR,
        payload: list
    }
}

export const forget = (list) => {
    return {
        type: Actionsignup.FORGET,
        payload: list
    }
}

export const forgetsuccess = (list) => {
    return {
        type: Actionsignup.FORGET_SUCCESS,
        payload: list
    }
}

export const forgeterror = (list) => {
    return {
        type: Actionsignup.FORGET_ERROR,
        payload: list
    }
}