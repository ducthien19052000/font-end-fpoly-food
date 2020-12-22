export const ActionType = {
    GET_DATE_MENU : 'GET_DATE_MENU',
    GET_DATE_MENU_SUCCESS: 'GET_DATE_MENU_SUCCESS',
    GET_DATE_MENU_ERROR: 'GET_DATE_MENU_ERROR',

    ADD_DATA_MENU: 'ADD_DATA_MENU',
    ADD_DATA_MENU_SUCCESS: 'ADD_DATA_MENU_SUCCESS',
    ADD_DATA_MENU_ERROR: 'ADD_DATA_MENU_ERROR',

    DELETE_DATA_MENU: 'DELETE_DATA_MENU',
    DELETE_DATA_MENU_SUCCESS: 'DELETE_DATA_MENU_SUCCESS',
    DELETE_DATA_MENU_ERROR: 'DELETE_DATA_MENU_ERROR',

    EDIT_DATA_MENU: 'EDIT_DATA_MENU',
    EDIT_DATA_MENU_SUCCESS: 'EDIT_DATA_MENU_SUCCESS',
    EDIT_DATA_MENU_ERROR: 'EDIT_DATA_MENU_ERROR',

    SEARCH_DATA_MENU: 'SEARCH_DATA_MENU'
}
export const getDataMenu = (list) => {
    return {
        type: ActionType.GET_DATE_MENU,
        payload : list
    }
}
export const getDataSuccess = (list) => {
    return {
        type: ActionType.GET_DATE_MENU_SUCCESS,
        payload : list
    }
}
export const getDataError = (list) => {
    return {
        type: ActionType.GET_DATE_MENU_ERROR,
        payload : list
    }
}

export const addData = (list) => {
    return {
        type: ActionType.ADD_DATA_MENU,
        payload : list
    }
}

export const addDataSuccess = (list) => {
    return {
        type: ActionType.ADD_DATA_MENU_SUCCESS,
        payload : list
    }
}

export const addDataError = (list) => {
    return {
        type: ActionType.ADD_DATA_MENU_ERROR,
        payload : list
    }
}

export const deleteData = (id) => {
    return {
        type: ActionType.DELETE_DATA_MENU,
        payload : id
    }
}

export const deleteDataSuccess = (list) => {
    return {
        type: ActionType.DELETE_DATA_MENU_SUCCESS,
        payload : list
    }
}

export const deleteDataError = error => {
    return {
        type: ActionType.DELETE_DATA_MENU_ERROR,
        payload : {
            error,
        }
    }
}

export const editData = (list,id) => {
    return {
        type: ActionType.EDIT_DATA_MENU,
        payload: {
            list,
            id
        }
    }
}
export const editDataSuccess = (list) => {
    return {
        type: ActionType.EDIT_DATA_MENU_SUCCESS,
        payload: list
    }
}
export const editDataError = (list) => {
    return {
        type: ActionType.EDIT_DATA_MENU_ERROR,
        payload: list
    }
}

export const searchData = (list) => {
    return {
        type: ActionType.SEARCH_DATA_MENU,
        payload: list
    }
}

