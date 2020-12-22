export const Action_Type = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',

    GETUSER_ONLINE: 'GETUSER_ONLINE'
}
export const login = (list) => {
  return {
    type: Action_Type.LOGIN,
    payload: list
  }
}

export const loginsuccess = (list) => {
    return {
      type: Action_Type.LOGIN_SUCCESS,
      payload: list
    }
  }

  export const loginerror = (list) => {
    return {
      type: Action_Type.LOGIN_ERROR,
      payload: list
    }
  }

  export const getuseronline = (list) => {
    return {
      type: Action_Type.GETUSER_ONLINE,
      payload: list
    }
  }