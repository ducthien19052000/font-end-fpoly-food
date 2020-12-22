import { put, takeLatest } from "redux-saga/effects";
import { API_BASE_URL } from "../../constants";
import { ActionType, addDataBookSuccess, getDataBookSuccessUser } from "../Action/invoiceBookAction";


function* fetchAddInvoice(data) {
 
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const requestGet = yield fetch(
        API_BASE_URL+`/invoice/online`,
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }),
          body: JSON.stringify(data.payload),
        }
      );
      const resp = yield requestGet.json();
      

      localStorage.setItem("OrderDetail", JSON.stringify({}));
      yield put(addDataBookSuccess(resp.body));
    } catch (error) {}
  }
}




function* SagaGetDataInvoiceUserBook(data) {
  const token = localStorage.getItem("accessToken");
  
  try {
    try {
      const requestGet = yield fetch(
        API_BASE_URL+`/order-by-date?email=${data.payload}`,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          }),
        }
      );
      const resp = yield requestGet.json();
      
      yield put(getDataBookSuccessUser(resp.body));
    } catch (error) {}
  } catch (error) {}
}

export default function* watchInvoiceUserSagaGetData() {

  yield takeLatest(ActionType.GET_INVOICE_USER_BOOK_DATA, SagaGetDataInvoiceUserBook);
}
