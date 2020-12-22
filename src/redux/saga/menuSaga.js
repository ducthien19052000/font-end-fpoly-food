import {ActionType, addDataSuccess, deleteDataSuccess, editDataSuccess, getDataSuccess} from '../Action/menuAction'
import {fork, put, take, takeLatest} from 'redux-saga/effects'
import { API_BASE_URL } from '../../constants';

function* fetchListMENU(){
    while(true){
      yield take(ActionType.GET_DATE_MENU)
        const requestGet = yield fetch(API_BASE_URL+`/menu/`,{
            method: 'GET',
            headers: new Headers({
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin": "*"
            })
                
        })
        const resp = yield requestGet.json();
     
            yield put(getDataSuccess(resp.body.content));

    }
   
}
function* SagaAddData(data){
   
    const isLogin = localStorage.getItem('islogin')
    try {
        const requestAdd = yield fetch(API_BASE_URL+`/menu/`,{
            method: 'POST',
            headers: new Headers({
                'Content-Type' : 'application/json',
                "Accept": "application/json",
                'Authorization': `Bearer ${isLogin}`
              
            }),
            body: JSON.stringify(data.payload)
        })
        const responeAdd = yield requestAdd.json();
        
        yield put (addDataSuccess(responeAdd.body));
    } catch (error) {
        console.log(error)
    }
}
function * SagaDeleteData(id){
    
    
    const isLogin = localStorage.getItem('islogin')
    try {
        const requestDelete = yield fetch(API_BASE_URL+`/menu/${id.payload}`,{
            method: 'DELETE',
            headers: new Headers({
                'Content-Type' : 'application/json',
                "Accept": "application/json",
                'Authorization': `Bearer ${isLogin}`
            })
        })
        const responeDelete = yield requestDelete.json();
        
        yield put (deleteDataSuccess(id.payload));
    } catch (error) {
        console.log(error);
    }
}

function* SagaEditData(data){
    
    const isLogin = localStorage.getItem('islogin')
    if (data)
    try {
        const requestEdit = yield fetch(API_BASE_URL+`/menu/${data.payload.id}`,{
            method: 'PUT',
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Accept': '*/*',
                'Authorization': `Bearer ${isLogin}`
            }),
            body: JSON.stringify(data.payload.list)
        })
        const responeEdit = yield requestEdit.json();
        
        yield put (editDataSuccess(responeEdit.body));
    } catch (error) {
        console.log(error);
    }
    else return;
}
export default function* watchMenuSagaGetdata(){
    yield fork(fetchListMENU);
    yield takeLatest(ActionType.ADD_DATA_MENU,SagaAddData);
    yield takeLatest(ActionType.DELETE_DATA_MENU,SagaDeleteData);
    yield takeLatest(ActionType.EDIT_DATA_MENU,SagaEditData);

}