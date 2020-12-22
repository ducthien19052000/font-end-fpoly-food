import { takeLatest, put } from "redux-saga/effects";
import { Actionsignup, signupsuccess, signuperror } from "../Action/forgotPasswordAction";

function* SagaSignup(user) {
    console.log(user.payload.password);
    if(user)
        try {
        const reqsignup = yield fetch(`https://social-aht.herokuapp.com/api/v1/user/register`,{
            method: 'POST', 
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            body: JSON.stringify({
                firstName: user.payload.firstname,
                lastName:  user.payload.lastname,
                username:  user.payload.username,
                password:  user.payload.password,
                email:     user.payload.email,
                birthday:  user.payload.birthday,
                gender:    user.payload.gender,
            })
        })
        const ressignup = yield reqsignup.json();
        console.log(ressignup);
        yield put(signupsuccess(ressignup))
       } catch (error) {
        yield put(signuperror(error))
    }
}
function* SagaForget(email){
    console.log('====================================');
    console.log(email.payload);
    console.log('====================================');
    try {
        const reqforget = yield fetch(`https://aht-social.herokuapp.com/api/v1/user/forgetPassword`,{
            method: 'POST',
            headers: new Headers({
                // 'Content-Type': 'text/plan',
                'Content-type': 'application/json',
                'Accept': '*/*'
            }),
            body: JSON.stringify({email: email.payload})
        })
        const resforget = reqforget.json();
        console.log(resforget);
    } catch (error) {
        
    }
}
export default function* watchSagasignup(){
    yield takeLatest(Actionsignup.SIGN_UP, SagaSignup)
    yield takeLatest(Actionsignup.FORGET , SagaForget)
}