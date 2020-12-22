import { put, takeLatest } from 'redux-saga/effects';
import { API_BASE_URL } from '../../constants';
import { ActionType, editDataUserSuccess, getDataSuccess } from '../Action/userAction';


function* fetchUser(){
      
        const isLogin = localStorage.getItem('accessToken')
  
  if(isLogin){
    try {
        const requestGet = yield fetch(API_BASE_URL+`/user/me`,{
                method: 'GET',
                headers: new Headers({
                    'Content-Type' : 'application/json',
                    'Accept' : '*/*',
                    'Authorization': `Bearer ${isLogin}`              
                })
            })
        const resp = yield requestGet.json();
        
            yield put(getDataSuccess(resp));
       } catch (error) {
           console.log(error)
       }
  }   
   
}

function* SagaEditDataUser(data){

        const isLogin = localStorage.getItem('accessToken')
        try {
            const requestEdit = yield fetch(API_BASE_URL+`/user`,{
                method: 'PUT',
                headers: new Headers({
                    'Content-Type' : 'application/json',
                    'Accept': '*/*',
                    'Authorization': `Bearer ${isLogin}`     
                }),
                body: JSON.stringify(data.payload.list)
            })
            const responeEdit = yield requestEdit.json();
           
            yield put (editDataUserSuccess(responeEdit.body));
        } catch (error) {
            console.log(error);
        }
       
}
export default function* watchUserSagaGetData(){
    yield takeLatest(ActionType.GET_USER, fetchUser);
    yield takeLatest(ActionType.EDIT_DATA_USER,SagaEditDataUser)


}