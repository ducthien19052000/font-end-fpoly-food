import {
  Button,
  Descriptions,
  notification,
  PageHeader,
  Row,
  Statistic,
  Tag,
} from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { API_BASE_URL } from "../../../../constants";
import {
  addToCart,
  deleteAllCart,
  getNumbers,
  removeToCart,
  updateToCart,
} from "../../../../redux/Action/cartBookingAction";
import * as foodAction from "../../../../redux/Action/index";
import * as invoiceUserAction from "../../../../redux/Action/invoiceBookAction";
import EditItemInvoiceBook from "./EditItemInvoiceBook";
import "./index.css";
import { deleteAllId, getId } from "../../../../redux/Action/idAction";

const InvoiceBookItem = ({
  invoice,
  products,
  onGetDataCart,
  onDeleteAllToCart,
  id,
  isModalVisible,
  showModal,
  handleOk,
  handleCancel,
  fetchInvoice,
  index,onGetIdData,
  idData,
  onDeleteId
}) => {
  const token = localStorage.getItem("accessToken");
  const a = [...idData,invoice.invoiceInfo.id];
  const cart = invoice.cartProduct.map((item, index) => {
    return {
      product: item.productInfo,
      quantity: item.quantity,
      topping: item.toppingList,
      note: item.note,
    };
  });
  const [product, setProduct] = useState();
  const showModalEidt = (invoices) => {
    console.log(invoices);
    setProduct(a);
    showModal();
    onGetIdData(a)
    onGetDataCart(cart);
  };

  const handleOkEdit = () => {
    onDeleteId([])
    handleOk();
  };

  const handleCancelEdit = () => {
    onDeleteAllToCart([]);
    onDeleteId([])
    handleCancel();
  };

  const showQuantity = (product) => {
    var index = 0;
    if (product.length > 0) {
      for (var i = 0; i < product.length; i++) {
        index += product[i].quantity;
      }
      return index;
    }
  };
  const handleEdit = (data) => {
    const idEdit = idData[0]
    fetch(API_BASE_URL + `/order-by-date/${idEdit}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        onDeleteAllToCart([]);
        handleCancelEdit()
        notification["success"]({
          message: "",
          duration: 2,
          description: "Cập nhật hóa đơn thành công",
        });
       

        return res;
      })
      .catch((error) => {});
  };
  const handleChoose = () => {
    fetch(
      API_BASE_URL + `/order-by-date/set-default/${invoice.invoiceInfo.id}`,
      {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        fetchInvoice();
        notification["success"]({
          message: "",
          duration: 2,
          description: "Chọn hóa đơn hàng ngày ",
        });
        handleCancelEdit();

        return res;
      })
      .catch((error) => {});
  };

  return (
    <div>
      {invoice.setDefault ? (
        <PageHeader
          style={{ border: "2px solid #00793F", borderRadius: "5px" }}
          title={`Đơn hàng `}
          tags={<Tag color="blue"></Tag>}
          extra={[
            <Button
              key="2"
              style={{ background: "rgb(255, 80, 80)" }}
              type="primary"
              onClick={() => showModalEidt(id)}
            >
              <b>
                <b>Sửa</b>
              </b>
            </Button>,

            <Button key="1" type="primary">
              <b>Chọn</b>
            </Button>,
          ]}
        >
          <Row>
            <Descriptions size="small" column={1}>
              <Descriptions.Item label="Danh sách món ăn">
                {invoice.cartProduct.map((item, index) => (
                  <>
                    <p>
                      {item.productInfo.productName} x {item.quantity}{" "}
                    </p>
                  </>
                ))}
              </Descriptions.Item>
            </Descriptions>
            <Statistic
              title="Số sản phẩm"
              value={showQuantity(invoice.cartProduct)}
            />

            <Statistic
              title="Chi phí"
              value={invoice.invoiceInfo.amountTotal}
              style={{
                margin: "0 32px",
              }}
            />
          </Row>
        </PageHeader>
      ) : (
        <PageHeader
          title={`Đơn hàng `}
          tags={<Tag color="blue"></Tag>}
          extra={[
            <Button
              key="2"
              style={{ background: "rgb(255, 80, 80)" }}
              type="primary"
              onClick={() => showModalEidt(invoice)}
            >
              <b>
                <b>Sửa</b>
              </b>
            </Button>,

            <Button key="1" type="primary" onClick={() => handleChoose()}>
              <b>Chọn</b>
            </Button>,
          ]}
        >
          <Row>
            <Descriptions size="small" column={1}>
              <Descriptions.Item label="Danh sách món ăn">
                {invoice.cartProduct.map((item, index) => (
                  <>
                    <p>
                      {item.productInfo.productName} x {item.quantity}{" "}
                    </p>
                  </>
                ))}
              </Descriptions.Item>
            </Descriptions>
            <Statistic
              title="Số sản phẩm"
              value={showQuantity(invoice.cartProduct)}
            />

            <Statistic
              title="Chi phí"
              value={invoice.invoiceInfo.amountTotal}
              style={{
                margin: "0 32px",
              }}
            />
          </Row>
        </PageHeader>
      )}
      {isModalVisible ? (
        <EditItemInvoiceBook
          isModalVisible={isModalVisible}
          handleEdit={handleEdit}
          handleOk={handleOkEdit}
          id={a}
          handleCancel={handleCancelEdit}
          products={products}
          invoice={invoice}
        />
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    litsFood: state.foodData.lists,
    cart: state.cartAdminData,
    invoiceUser: state.invoiceUser,
    idData: state.IdData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    foodAct: bindActionCreators(foodAction, dispatch),
    invoiceAct: bindActionCreators(invoiceUserAction, dispatch),
    onGetIdData: (data) => {
      dispatch(getId(data));
    },
    onDeleteId:(data)=>{
        dispatch(deleteAllId(data))
    },
    onGetDataCart: (data) => {
      dispatch(getNumbers(data));
    },
    onDeletePrToCart: (product, topping) => {
      dispatch(removeToCart(product, topping));
    },
    onUpdatePrToCart: (product, quantity, topping, note) => {
      dispatch(updateToCart(product, quantity, topping, note));
    },
    AddToCart: (product, quantity, topping, note) => {
      dispatch(addToCart(product, quantity, topping, note));
    },
    onDeleteAllToCart: (product) => {
      dispatch(deleteAllCart(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceBookItem);
