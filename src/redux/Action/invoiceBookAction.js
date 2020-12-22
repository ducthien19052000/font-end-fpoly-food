export const ActionType = {
    GET_INVOICE_DATA : 'GET_INVOICE_DATA',
    GET_INVOICE_DATA_SUCCESS: 'GET_INVOICE_DATA_SUCCESS',
    GET_INVOICE_DATA_ERROR: 'GET_INVOICE_DATA_ERROR',

    GET_INVOICE_USER_DATA :'GET_INVOICE_USER_DATA',
    GET_INVOICE_USER_DATA_SUCCESS: 'GET_INVOICE_USER_DATA_SUCCESS',
    GET_INVOICE_USER_DATA_ERROR: 'GET_INVOICE_USER_DATA_ERROR',

    GET_INVOICE_USER_BOOK_DATA :'GET_INVOICE_USER_BOOK_DATA',
    GET_INVOICE_USER_BOOK_DATA_SUCCESS: 'GET_INVOICE_USER_BOOK_DATA_SUCCESS',
    GET_INVOICE_USER_BOOK_DATA_ERROR: 'GET_INVOICE_USER_BOOK_DATA_ERROR',


    ADD_INVOICE_DATA: 'ADD_INVOICE_DATA',
    ADD_INVOICE_DATA_SUCCESS: 'ADD_INVOICE_DATA_SUCCESS',
    ADD_INVOICE_DATA_ERROR: 'ADD_INVOICE_DATA_ERROR',
    
    ADD_INVOICE_BOOK_DATA: 'ADD_INVOICE_BOOK_DATA',
    ADD_INVOICE_BOOK_DATA_SUCCESS: 'ADD_INVOICE_BOOK_DATA_SUCCESS',
    ADD_INVOICE_BOOK_DATA_ERROR: 'ADD_INVOICE_BOOK_DATA_ERROR',

    DELETE_INVOICE_DATA: 'DELETE_INVOICE_DATA',
    DELETE_INVOICE_DATA_SUCCESS: 'DELETE_INVOICE_DATA_SUCCESS',
    DELETE_INVOICE_DATA_ERROR: 'DELETE_INVOICE_DATA_ERROR',

    EDIT_INVOICE_DATA: 'EDIT_INVOICE_DATA',
    EDIT_INVOICE_DATA_SUCCESS: 'EDIT_INVOICE_DATA_SUCCESS',
    EDIT_INVOICE_DATA_ERROR: 'EDIT_INVOICE_DATA_ERROR',

    

    SEARCH_DATA: 'SEARCH_DATA'
}


export const getDataBookUser = (list) => {
    return {
        type: ActionType.GET_INVOICE_USER_BOOK_DATA,
        payload : list
    }
}
export const getDataBookSuccessUser = (list) => {
    return {
        type: ActionType.GET_INVOICE_USER_BOOK_DATA_SUCCESS,
        payload : list
    }
}
export const getDataBookErrorUser = (list) => {
    return {
        type: ActionType.GET_INVOICE_USER_BOOK_DATA_ERROR,
        payload : list
    }
}




export const addDataBook = (list) => {
    return {
        type: ActionType.ADD_INVOICE_BOOK_DATA,
        payload : list
    }
}

export const addDataBookSuccess = (list) => {
    return {
        type: ActionType.ADD_INVOICE_BOOK_DATA_SUCCESS,
        payload : list
    }
}

export const addDataBookError = (list) => {
    return {
        type: ActionType.ADD_INVOICE_BOOK_DATA_ERROR,
        payload : list
    }
}