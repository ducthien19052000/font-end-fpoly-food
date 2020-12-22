export const ActionType = {
    GET_USER : 'GET_USER',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_ERROR: 'GET_USER_ERROR',

    EDIT_DATA_USER: 'EDIT_DATA_USER',
    EDIT_DATA_USER_SUCCESS: 'EDIT_DATA_USER_SUCCESS',
    EDIT_DATA_USER_ERROR: 'EDIT_DATA_USER_ERROR',


    
}
export const getData = (list) => {
    return {
        type: ActionType.GET_USER,
        payload : list
    }
}
export const getDataSuccess = (list) => {
    return {
        type: ActionType.GET_USER_SUCCESS,
        payload : list
    }
}
export const getDataError = (list) => {
    return {
        type: ActionType.GET_USER_ERROR,
        payload : list
    }
}

export const editDataUser = (list) => {
    return {
        type: ActionType.EDIT_DATA_USER,
        payload: {
            list
        }
    }
}
export const editDataUserSuccess = (list) => {
    return {
        type: ActionType.EDIT_DATA_USER_SUCCESS,
        payload: list
    }
}
export const editDataError = (list) => {
    return {
        type: ActionType.EDIT_DATA_USER_ERROR,
        payload: list
    }
}