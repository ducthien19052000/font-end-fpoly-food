import { fork, put, take, takeLatest } from 'redux-saga/effects';
import { API_BASE_URL } from '../../constants';
import { ActionType, addDataSuccess, deleteDataSuccess, editDataSuccess, getDataGroupSuccess, getDataSuccess } from '../Action/index';

function* fetchListFood() {
    while (true) {
        yield take(ActionType.GET_DATA)
        const requestGet = yield fetch(API_BASE_URL+`/product/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': '*/*'
            })

        })
        const resp = yield requestGet.json();
      
        yield put(getDataSuccess(resp.body.content));

    }

}

function* fetchListFoodGroup(id) {
    try {
      
        
        const respone = yield fetch(API_BASE_URL+`/product/?productName=&status=&categoryId=${id.payload.id}&size=4&page=${id.payload.page}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }),

        })
        const res = yield respone.json();
        
        yield put(getDataGroupSuccess(res.body.content));
    } catch (error) {
        // console.log(error);
    }

}
function* SagaAddData(data){

    const isLogin = localStorage.getItem('islogin')

    try {
        const requestAdd = yield fetch(API_BASE_URL+`/product/`,{
            method: 'POST',
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Accept':'application/json',
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
        const requestDelete = yield fetch( API_BASE_URL+`/product/${id.payload}`,{
            method: 'DELETE',
            headers: new Headers({
               
                'Content-Type' : 'application/json',
                'Accept':'application/json',
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
    try {
        const requestEdit = yield fetch(API_BASE_URL+`/product/${data.payload.id}`,{
            method: 'PUT',
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Accept': '*/*',
                'Authorization': `Bearer ${isLogin}`
            }),
            body: JSON.stringify(data.payload.list)
        })
        const responeEdit = yield requestEdit.json();
        
        yield put (editDataSuccess(responeEdit));   
    } catch (error) {
        console.log(error);
    }
  
}
export default function* watchFoodSagaGetdata() {
    yield fork(fetchListFood);
    yield takeLatest(ActionType.GET_DATA_GROUP_FOOD, fetchListFoodGroup);
    yield takeLatest(ActionType.ADD_DATA, SagaAddData);
    yield takeLatest(ActionType.DELETE_DATA,SagaDeleteData);
    yield takeLatest(ActionType.EDIT_DATA,SagaEditData)


}