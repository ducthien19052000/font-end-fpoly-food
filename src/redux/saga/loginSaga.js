import { Action_Type, loginsuccess, loginerror } from "../Action/loginAction"
import { takeLatest, put } from "redux-saga/effects";

function* SagaLogin(user){
    console.log(user);
    const token = '';
    try {
        const requestlogin =  yield fetch(`https://social-aht.herokuapp.com/api/v1/user/login`,{
            method: 'POST',
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                
            }),
            
            body: JSON.stringify({username: user.payload.username, password: user.payload.password})
        })
        const responselogin = yield requestlogin.json();
        console.log(responselogin);
        if (responselogin.status === true) {
            localStorage.setItem('islogin', responselogin.token)
            localStorage.setItem('username',user.payload.username)
            
            // setAuthTokens(result.data);
            // setLoggedIn(true);
          } else {
            yield put(loginerror('error'))
            
          }
          
          yield put(loginsuccess(responselogin.token))
    } catch (error) {
        yield put(loginerror(error))
    }
}
export default function* watchsagaitem() {
    yield takeLatest(Action_Type.LOGIN, SagaLogin)
    
}